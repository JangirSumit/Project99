using System.Net;
using Microsoft.AspNetCore.Mvc;
using Project99.Server.DTOs;
using Project99.Server.Repositories.Db;

namespace Project99.Server.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly AppDbContext _appDbContext;

        public UsersController(ILogger<UsersController> logger, AppDbContext appDbContext)
        {
            _logger = logger;
            _appDbContext = appDbContext;

        }

        [HttpPost]
        [Route("/api/login")]
        public object Login(LoginRequest user)
        {
            try
            {
                return new LoginResponse("token", DateTime.Now.AddHours(1), Repositories.Models.Role.Admin);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }
    }
}
