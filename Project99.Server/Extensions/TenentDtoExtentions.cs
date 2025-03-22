using Project99.Server.DTOs;
using Project99.Server.Migrations;
using Project99.Server.Repositories.Models;

namespace Project99.Server.Extensions;

public static class TenentDtoExtentions
{
    public static TenentResponse ToTenentResponse(this Tenent tenent)
    {
        return new TenentResponse(tenent.Id, tenent.Name, tenent.GSTNumber);
    }

    public static TenentsResponse ToTenentResponse(this Tenent[] tenents)
    {
        return new TenentsResponse(tenents.Select(tenent => tenent.ToTenentResponse()).ToArray());
    }
}
