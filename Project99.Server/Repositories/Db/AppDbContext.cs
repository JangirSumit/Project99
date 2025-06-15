using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Project99.Server.Repositories.Models;

namespace Project99.Server.Repositories.Db;

public class AppDbContext : DbContext
{
    private readonly IConfiguration? _configuration;

    public AppDbContext(DbContextOptions<AppDbContext> options, IConfiguration? configuration = null)
        : base(options)
    {
        _configuration = configuration;
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Ticket> Tickets { get; set; }
    public DbSet<Tenent> Tenents { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (_configuration["Environment:Name"] == "dev")
        {
            optionsBuilder.UseSqlite("Data Source=app.db");
        }
        else
        {
            optionsBuilder.UseSqlServer(_configuration["ConnectionStrings:ProdConnection"]);
        }
    }
}
