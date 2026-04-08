using Microsoft.EntityFrameworkCore;
using ModernIKPortal.API.Models;
using FinansSistemi.API.Models;

namespace FinansSistemi.API.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<HesapPlani> HesapPlani { get; set; }
    public DbSet<FinansalHareketler> FinansalHareketler { get; set; }
    // AppDbContext.cs içini şöyle düzelt:
    public DbSet<User> Users { get; set; } // Kullanicilar yerine Users yaptık
    public DbSet<PerformansNotu> PerformansNotlari { get; set; }
    public DbSet<ProjectTask> ProjectTasks { get; set; }
   
}