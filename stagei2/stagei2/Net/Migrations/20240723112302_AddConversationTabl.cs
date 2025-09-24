using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace contosopizza.Migrations
{
    /// <inheritdoc />
    public partial class AddConversationTabl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RowVersion",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "RowVersion",
                table: "Conversations");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "Message",
                type: "longblob",
                nullable: false);

            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "Conversations",
                type: "longblob",
                nullable: false);
        }
    }
}
