using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project99.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateIdKeyColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Drop primary key constraint
            migrationBuilder.DropPrimaryKey(name: "PK_Users", table: "Users");

            // Alter Id column to be auto-increment
            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Users",
                type: "INTEGER",
                nullable: false)
                .Annotation("Sqlite:Autoincrement", true)
                .OldAnnotation("Sqlite:Autoincrement", false);

            // Re-add primary key
            migrationBuilder.AddPrimaryKey(name: "PK_Users", table: "Users", column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(name: "PK_Users", table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Users",
                type: "INTEGER",
                nullable: false)
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(name: "PK_Users", table: "Users", column: "Id");
        }
    }
}
