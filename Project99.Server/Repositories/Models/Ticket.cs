using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Project99.Server.Repositories.Models;

public class Ticket
{
    [Key] // Marks this as the primary key
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Enables auto-increment
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public Status Status { get; set; }
}

public enum Status
{
    ToDo,
    InProgress,
    Done,
    Closed
}