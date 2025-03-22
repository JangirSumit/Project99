namespace Project99.Server.DTOs;

public record TenentResponse(int Id, string Name, string GSTNumber);

public record TenentsResponse(TenentResponse[] Tenents);

public record RegisterTenentRequest(string Name, string GSTNumber);

public record RegisterTenentResponse(int Id);

public record UpdateTenentRequest(int Id, string Name, string GSTNumber);

public record DeleteTenentRequest(int Id);