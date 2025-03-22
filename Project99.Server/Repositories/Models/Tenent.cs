using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Project99.Server.Repositories.Models
{
    public class Tenent
    {
        [Key] // Marks this as the primary key
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Enables auto-increment
        public int Id { get; set; }
        public string Name { get; set; }
        public string GSTNumber { get; set; }
    }
}
