using Project99.Server.Repositories.Models;

namespace Project99.Server.DTOs;

public record LoginResponse(string Token, DateTime ExpirationTime, Role Role);

public record LoginRequest(string UserName, string Password);

public record UserResponse(int Id, string Name, string UserName, Role Role, int organizationId);

public record UsersResponse(UserResponse[] Users);

public record RegisterRequest(string Name, string UserName, string Password, Role Role, int organizationId);

public record RegisterResponse(int Id);

public record ProfileResponse(string Name, string UserName, Role Role, int organizationId);

public record UpdatePasswordRequest(string OldPassword, string NewPassword);

public record DeleteUserRequest(int Id, string UserName);
