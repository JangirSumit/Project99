using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project99.Server.Migrations
{
    /// <inheritdoc />
    public partial class addAdminUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            string adminHashedPassword = BCrypt.Net.BCrypt.HashPassword("Admin@123");

            migrationBuilder.Sql($@"
            INSERT INTO Users (Name, UserName, Password, Role, OrganizationId)
            SELECT 'Admin', 'admin', '{adminHashedPassword}', 0, 1000
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
