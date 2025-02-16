using Microsoft.EntityFrameworkCore;
using Project99.Server.Repositories.Models;

namespace Project99.Server.Repositories.Db;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=app.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Check if an Admin user already exists
        const string adminHashedPassword = "$2a$11$Pq/1Eh.6QUHslfHxZ2Bw.OCVyz2lBZFCMQO5x5H3WpT7SOeZL3miK";

        modelBuilder.Entity<User>().HasData(new User
        {
            Id = 1,
            Name = "Admin",
            UserName = "admin",
            Password = adminHashedPassword,
            Role = Role.Admin
        });
    }
}
