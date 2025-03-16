using Microsoft.EntityFrameworkCore;
using Project99.Server.Repositories.Models;

namespace Project99.Server.Repositories.Db;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Ticket> Tickets { get; set; } 

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=app.db");
    }
}
