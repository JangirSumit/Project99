using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project99.Server.DTOs;
using Project99.Server.Extensions;
using Project99.Server.Repositories;
using Project99.Server.Repositories.Models;
using RegisterRequest = Project99.Server.DTOs.RegisterTicketRequest;

namespace Project99.Server.Controllers;

[ApiController]
[Route("api/tickets")]
public class TicketController(ILogger<TicketController> logger,
    IRepository<Ticket> ticketRepository) : ControllerBase
{
    private readonly ILogger<TicketController> _logger = logger;
    private readonly IRepository<Ticket> _ticketRepository = ticketRepository;

    [HttpGet]
    public ActionResult<TicketsResponse> Get()
    {
        try
        {
            var tickets = _ticketRepository.Get().Select(ticket => ticket.ToTicketResponse()).ToArray();
            return Ok(tickets);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching tickets");
            return StatusCode(500, "Internal Server Error");
        }
    }
    [HttpGet("{id}")]
    public ActionResult<TicketResponse> GetById(int id)
    {
        try
        {
            var ticket = _ticketRepository.Get(id);
            return Ok(ticket);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching tickets");
            return StatusCode(500, "Internal Server Error");
        }
    }

    /// 🔹 API to Register a New Ticket
    [HttpPost("register")]
    public ActionResult<int> Register([FromBody] RegisterRequest newTicket)
    {
        try
        {
            var user = new Ticket
            {
                Title = newTicket.Title,
                Description = newTicket.Description,
                Status = newTicket.Status
            };

            var result = _ticketRepository.Add(user);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ticket registration error");
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpDelete("delete")]
    public ActionResult<bool> Delete([FromBody] DeleteTicketRequest deleteTicketRequest)
    {
        try
        {
            // Check if username already exists
            var ticket = _ticketRepository.Get().FirstOrDefault(u => u.Id == deleteTicketRequest.Id);
            if (ticket is null)
                return NotFound(new { message = "Id does not exists" });

            var result = _ticketRepository.Delete(ticket);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ticket deleation error");
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpPut("update-ticket")]
    public ActionResult UpdateTicket([FromBody] UpdateTicketRequest request)
    {
        try
        {
            // Find the ticket in the repository
            var Ticket = _ticketRepository.Get().FirstOrDefault(u => u.Id == request.Id);
            if (Ticket == null)
                return NotFound(new { message = "Ticket not found" });

            // update the new Title
            Ticket.Title = request.Title;

            // update the new Description
            Ticket.Description = request.Description;

            // update the status
            Ticket.Status = request.Status;

            // Save the updated ticket record
            _ticketRepository.Update(Ticket);

            return Ok(new { message = "Ticket updated successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating ticket");
            return StatusCode(500, "Internal Server Error");
        }
    }
}
