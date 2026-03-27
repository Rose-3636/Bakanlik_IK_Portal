using Microsoft.EntityFrameworkCore;

namespace ModernIKPortal.API.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Personel> Personeller { get; set; } // SQL'deki tablomuz
        public DbSet<Pozisyon> Pozisyonlar { get; set; }
        public DbSet<Egitim> Egitimler { get; set; }
        public DbSet<PuantajKaydi> PuantajKayitlari { get; set; }
        public DbSet<IzinTalebi> IzinTalepleri { get; set; }
    }
}