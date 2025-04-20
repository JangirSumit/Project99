using Project99.Server.Common;
using Project99.Server.Repositories.Models;

namespace Project99.Server.DTOs;

public record TicketResponse(int Id, string Title, string products, Status Status, int OrganizationId);

public record TicketsResponse(TicketResponse[] Tickets);

public record RegisterTicketRequest(string Title, List<ProductItem> products, Status Status, int OrganizationId, Priority Priority);

public record RegisterTicketResponse(int Id);

public record UpdateTicketRequest(int Id, Status Status);

public record DeleteTicketRequest(int Id);