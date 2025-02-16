using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project99.Server.Migrations
{
    /// <inheritdoc />
    public partial class SeedAdminUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            string adminHashedPassword = BCrypt.Net.BCrypt.HashPassword("Admin@123");

            migrationBuilder.Sql($@"
                INSERT INTO Users (Id, Name, UserName, Password, Role)
                SELECT 1, 'Admin', 'admin', '{adminHashedPassword}', 'Admin'
                WHERE NOT EXISTS (SELECT 1 FROM Users WHERE UserName = 'admin');
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Users WHERE UserName = 'admin';");
        }
    }
}
