using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;
using server.Models;

namespace server.Data
{
    public class EkostContext : DbContext
    {
        public EkostContext(DbContextOptions options) : base(options) { }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Kost> Kosts { get; set; }
        public DbSet<GeneralFacility> GeneralFacilities { get; set; }
        public DbSet<RoomFacility> RoomFacilities { get; set; }
        public DbSet<ToiletFacility> ToiletFacilities { get; set; }
        public DbSet<DetailRoomFacility> DetailRoomFacilities { get; set; }
        public DbSet<DetailToiletFacility> DetailToiletFacilities { get; set; }
        public DbSet<DetailGeneralFacility> DetailGeneralFacilities { get; set; }
        public DbSet<Favorit> Favorits { get; set; }
        public DbSet<KostTenant> KostTenants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.Property(a => a.Foto).IsRequired(false);
            });

            modelBuilder.Entity<Kost>(entity =>
            {
                entity.Property(k => k.KostImage).IsRequired(false);
                entity.Property(k => k.Description).IsRequired(false);
                entity.Property(k => k.KostImage).IsRequired(false);
            });
        }
    }
}