using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Project99.Server.Repositories.Models;

public class User
{
    [Key] // Marks this as the primary key
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Enables auto-increment
    public int Id { get; set; }
    public string Name { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    public Role Role { get; set; }
    public int OrganizationId { get; set; }
}

public enum Role
{
    Admin,
    User
}
