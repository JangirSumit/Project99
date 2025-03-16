using Project99.Server.Repositories.Models;

namespace Project99.Server.DTOs;

public record TicketResponse(int Id, string Title, string Description, Status Status);

public record TicketsResponse(TicketResponse[] Tickets);

public record RegisterTicketRequest(string Title, string Description, Status Status);

public record RegisterTicketResponse(int Id);

public record UpdateTicketRequest(int Id, string Title, string Description, Status Status);

public record DeleteTicketRequest(int Id);