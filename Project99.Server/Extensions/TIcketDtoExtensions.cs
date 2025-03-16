using Project99.Server.DTOs;
using Project99.Server.Repositories.Models;

namespace Project99.Server.Extensions;

public static class TicketDtoExtensions
{
    public static TicketResponse ToTicketResponse(this Ticket ticket)
    {
        return new TicketResponse(ticket.Id, ticket.Title, ticket.Description, ticket.Status);
    }

    public static TicketsResponse ToTicketResponse(this Ticket[] tickets)
    {
        return new TicketsResponse(tickets.Select(ticket => ticket.ToTicketResponse()).ToArray());
    }
}
