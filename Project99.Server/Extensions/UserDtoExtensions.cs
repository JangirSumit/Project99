using Project99.Server.DTOs;
using Project99.Server.Repositories.Models;

namespace Project99.Server.Extensions;

public static class UserDtoExtensions
{
    public static UserResponse ToUserResponse(this User user)
    {
        return new UserResponse(user.Id, user.Name, user.UserName, user.Role, user.OrganizationId);
    }

    public static UsersResponse ToUsersResponse(this User[] users)
    {
        return new UsersResponse(users.Select(user => user.ToUserResponse()).ToArray());
    }
}
