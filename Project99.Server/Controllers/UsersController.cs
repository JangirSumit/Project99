using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Project99.Server.DTOs;
using Project99.Server.Extensions;
using Project99.Server.Repositories;
using Project99.Server.Repositories.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using RegisterRequest = Project99.Server.DTOs.RegisterRequest;
using LoginRequest = Project99.Server.DTOs.LoginRequest;

namespace Project99.Server.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController(ILogger<UsersController> logger, IConfiguration configuration,
    IRepository<User> userRepository) : ControllerBase
{
    private readonly ILogger<UsersController> _logger = logger;
    private readonly IConfiguration _configuration = configuration;
    private readonly IRepository<User> _userRepository = userRepository;

    [HttpGet]
    [Authorize]
    public ActionResult<UsersResponse> Get()
    {
        try
        {
            var users = _userRepository.Get().ToUsersResponse();
            return Ok(users);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching users");
            return StatusCode(500, "Internal Server Error");
        }
    }

    /// 🔹 API to Register a New User with Encrypted Password
    [HttpPost("register")]
    [Authorize]
    public ActionResult<int> Register([FromBody] RegisterRequest newUser)
    {
        try
        {
            // Check if username already exists
            if (_userRepository.Get().Any(u => u.UserName == newUser.UserName))
                return Conflict(new { message = "Username already exists" });

            // Hash password before storing it
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(newUser.Password);

            var user = new User
            {
                Name = newUser.Name,
                UserName = newUser.UserName,
                Password = hashedPassword, // 🔒 Store only the hashed password
                Role = newUser.Role,
                OrganizationId = newUser.organizationId
            };

            var result = _userRepository.Add(user);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "User registration error");
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpDelete("delete")]
    [Authorize]
    public ActionResult<bool> Delete([FromBody] DeleteUserRequest deleteUserRequest)
    {
        try
        {
            // Check if username already exists
            var user = _userRepository.Get().FirstOrDefault(u => u.UserName == deleteUserRequest.UserName && u.Id == deleteUserRequest.Id);
            if (user is null)
                return NotFound(new { message = "Username does not exists" });

            var result = _userRepository.Delete(user);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "User registration error");
            return StatusCode(500, "Internal Server Error");
        }
    }

    /// 🔹 API for User Login with Password Validation
    [HttpPost("login")]
    public ActionResult<LoginResponse> Login([FromBody] LoginRequest user)
    {
        try
        {
            // Find user in the repository
            var foundUser = _userRepository.Get().FirstOrDefault(u => u.UserName == user.UserName);
            if (foundUser == null)
                return Unauthorized(new { message = "Invalid username or password" });

            // Validate the password using BCrypt
            if (!BCrypt.Net.BCrypt.Verify(user.Password, foundUser.Password))
                return Unauthorized(new { message = "Invalid username or password" });

            // Generate JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                [
                        new Claim(ClaimTypes.Name, foundUser.Name),
                        new Claim(ClaimTypes.NameIdentifier, foundUser.UserName),
                        new Claim(ClaimTypes.Role, foundUser.Role.ToString()),
                        new Claim("OrganizationId", foundUser.OrganizationId.ToString())
                    ]),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new LoginResponse
            (
                tokenHandler.WriteToken(token),
                token.ValidTo,
                foundUser.Role
            ));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Login error");
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpPut("update-password")]
    [Authorize]
    public ActionResult UpdatePassword([FromBody] UpdatePasswordRequest request)
    {
        try
        {
            // Get the current logged-in user
            var userName = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userName == null)
                return Unauthorized(new { message = "User not authenticated" });

            // Find the user in the repository
            var user = _userRepository.Get().FirstOrDefault(u => u.UserName == userName);
            if (user == null)
                return NotFound(new { message = "User not found" });

            // Verify the old password
            if (!BCrypt.Net.BCrypt.Verify(request.OldPassword, user.Password))
                return BadRequest(new { message = "Old password is incorrect" });

            // Hash the new password
            user.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);

            // Save the updated user record
            _userRepository.Update(user);

            return Ok(new { message = "Password updated successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating password");
            return StatusCode(500, "Internal Server Error");
        }
    }


    [HttpGet("profile")]
    [Authorize]
    public ActionResult<ProfileResponse> GetProfile()
    {
        try
        {
            var name = User.Identity?.Name;
            var userName = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
            var OrganizationId = User.Claims.FirstOrDefault(c => c.Type == "OrganizationId")?.Value;

            return Ok(new ProfileResponse(name, userName, (Role)Enum.Parse(typeof(Role), role), Convert.ToInt32(OrganizationId)));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Profile error");
            return StatusCode(500, "Internal Server Error");
        }
    }
}
