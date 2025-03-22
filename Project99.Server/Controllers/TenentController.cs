using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project99.Server.DTOs;
using Project99.Server.Extensions;
using Project99.Server.Repositories;
using Project99.Server.Repositories.Models;
using RegisterRequest = Project99.Server.DTOs.RegisterTenentRequest;

namespace Project99.Server.Controllers;

[ApiController]
[Route("api/tenents")]
public class TenentController(ILogger<TenentController> logger,
    IRepository<Tenent> tenentRepository) : ControllerBase
{
    private readonly ILogger<TenentController> _logger = logger;
    private readonly IRepository<Tenent> _tenentRepository = tenentRepository;

    [HttpGet]
    public ActionResult<TenentsResponse> Get()
    {
        try
        {
            var tenents = _tenentRepository.Get().Select(tenent => tenent.ToTenentResponse()).ToArray();
            return Ok(tenents);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching tenents");
            return StatusCode(500, "Internal Server Error");
        }
    }
    [HttpGet("{id}")]
    public ActionResult<TenentResponse> GetById(int id)
    {
        try
        {
            var tenent = _tenentRepository.Get(id);
            return Ok(tenent);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching tenents");
            return StatusCode(500, "Internal Server Error");
        }
    }

    /// 🔹 API to Register a New Ticket
    [HttpPost("register")]
    public ActionResult<int> Register([FromBody] RegisterRequest newTenent)
    {
        try
        {
            var tenent = new Tenent
            {
                Name = newTenent.Name,
                GSTNumber = newTenent.GSTNumber
            };

            var result = _tenentRepository.Add(tenent);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Tenent registration error");
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpDelete("delete")]
    public ActionResult<bool> Delete([FromBody] DeleteTenentRequest deleteTenentRequest)
    {
        try
        {
            // Check if username already exists
            var tenent = _tenentRepository.Get().FirstOrDefault(u => u.Id == deleteTenentRequest.Id);
            if (tenent is null)
                return NotFound(new { message = "Id does not exists" });

            var result = _tenentRepository.Delete(tenent);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Tenent deleation error");
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpPut("update-tenent")]
    public ActionResult UpdateTenent([FromBody] UpdateTenentRequest request)
    {
        try
        {
            // Find the tenent in the repository
            var Tenent = _tenentRepository.Get().FirstOrDefault(u => u.Id == request.Id);
            if (Tenent == null)
                return NotFound(new { message = "Tenent not found" });

            // update the new Tenent
            Tenent.Name = request.Name;

            // update the new GSTNumber
            Tenent.GSTNumber = request.GSTNumber;

            return Ok(new { message = "Tenent updated successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating tenent");
            return StatusCode(500, "Internal Server Error");
        }
    }
}
