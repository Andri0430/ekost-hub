using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Foto = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Email);
                });

            migrationBuilder.CreateTable(
                name: "Favorits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KostId = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favorits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GeneralFacilities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NamaFasilitas = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeneralFacilities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoomFacilities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NamaFasilitas = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomFacilities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ToiletFacilities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NamaFasilitas = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToiletFacilities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Kosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KostName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KostImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KostPrice = table.Column<int>(type: "int", nullable: false),
                    KostType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QtyRoom = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    District = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OwnerEmail = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kosts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kosts_Accounts_OwnerEmail",
                        column: x => x.OwnerEmail,
                        principalTable: "Accounts",
                        principalColumn: "Email");
                });

            migrationBuilder.CreateTable(
                name: "DetailGeneralFacilities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GeneralFacilityId = table.Column<int>(type: "int", nullable: false),
                    KostId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailGeneralFacilities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailGeneralFacilities_GeneralFacilities_GeneralFacilityId",
                        column: x => x.GeneralFacilityId,
                        principalTable: "GeneralFacilities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetailGeneralFacilities_Kosts_KostId",
                        column: x => x.KostId,
                        principalTable: "Kosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetailRoomFacilities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoomFacilityId = table.Column<int>(type: "int", nullable: false),
                    KostId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailRoomFacilities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailRoomFacilities_Kosts_KostId",
                        column: x => x.KostId,
                        principalTable: "Kosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetailRoomFacilities_RoomFacilities_RoomFacilityId",
                        column: x => x.RoomFacilityId,
                        principalTable: "RoomFacilities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetailToiletFacilities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ToiletFacilityId = table.Column<int>(type: "int", nullable: false),
                    kostId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailToiletFacilities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailToiletFacilities_Kosts_kostId",
                        column: x => x.kostId,
                        principalTable: "Kosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetailToiletFacilities_ToiletFacilities_ToiletFacilityId",
                        column: x => x.ToiletFacilityId,
                        principalTable: "ToiletFacilities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KostTenants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountEmail = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    KostId = table.Column<int>(type: "int", nullable: false),
                    TanggalMasuk = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LamaKost = table.Column<int>(type: "int", nullable: false),
                    TotalBiaya = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KostTenants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KostTenants_Accounts_AccountEmail",
                        column: x => x.AccountEmail,
                        principalTable: "Accounts",
                        principalColumn: "Email");
                    table.ForeignKey(
                        name: "FK_KostTenants_Kosts_KostId",
                        column: x => x.KostId,
                        principalTable: "Kosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DetailGeneralFacilities_GeneralFacilityId",
                table: "DetailGeneralFacilities",
                column: "GeneralFacilityId");

            migrationBuilder.CreateIndex(
                name: "IX_DetailGeneralFacilities_KostId",
                table: "DetailGeneralFacilities",
                column: "KostId");

            migrationBuilder.CreateIndex(
                name: "IX_DetailRoomFacilities_KostId",
                table: "DetailRoomFacilities",
                column: "KostId");

            migrationBuilder.CreateIndex(
                name: "IX_DetailRoomFacilities_RoomFacilityId",
                table: "DetailRoomFacilities",
                column: "RoomFacilityId");

            migrationBuilder.CreateIndex(
                name: "IX_DetailToiletFacilities_kostId",
                table: "DetailToiletFacilities",
                column: "kostId");

            migrationBuilder.CreateIndex(
                name: "IX_DetailToiletFacilities_ToiletFacilityId",
                table: "DetailToiletFacilities",
                column: "ToiletFacilityId");

            migrationBuilder.CreateIndex(
                name: "IX_Kosts_OwnerEmail",
                table: "Kosts",
                column: "OwnerEmail");

            migrationBuilder.CreateIndex(
                name: "IX_KostTenants_AccountEmail",
                table: "KostTenants",
                column: "AccountEmail");

            migrationBuilder.CreateIndex(
                name: "IX_KostTenants_KostId",
                table: "KostTenants",
                column: "KostId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetailGeneralFacilities");

            migrationBuilder.DropTable(
                name: "DetailRoomFacilities");

            migrationBuilder.DropTable(
                name: "DetailToiletFacilities");

            migrationBuilder.DropTable(
                name: "Favorits");

            migrationBuilder.DropTable(
                name: "KostTenants");

            migrationBuilder.DropTable(
                name: "GeneralFacilities");

            migrationBuilder.DropTable(
                name: "RoomFacilities");

            migrationBuilder.DropTable(
                name: "ToiletFacilities");

            migrationBuilder.DropTable(
                name: "Kosts");

            migrationBuilder.DropTable(
                name: "Accounts");
        }
    }
}
