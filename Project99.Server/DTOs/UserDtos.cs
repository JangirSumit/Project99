using Project99.Server.Repositories.Models;

namespace Project99.Server.DTOs;

public record LoginResponse(string Token, DateTime ExpirationTime, Role Role);

public record LoginRequest(string UserName, string Password);
