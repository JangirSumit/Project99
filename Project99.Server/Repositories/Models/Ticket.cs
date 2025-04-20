using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Project99.Server.Repositories.Models
{
    public class Ticket
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Products { get; set; }
        public Priority Priority { get; set; }
        public Status Status { get; set; }
        public int OrganizationId { get; set; }
    }

    public enum Status
    {
        Input,
        Chemical,
        Production,
        Done
    }

    public enum Priority
    {
        Low,
        Medium,
        High
    }
}
