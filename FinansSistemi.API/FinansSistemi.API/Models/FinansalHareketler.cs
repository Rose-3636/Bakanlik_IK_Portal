using System.ComponentModel.DataAnnotations;

namespace FinansSistemi.API.Models
{
    public class FinansalHareketler
    {
        [Key]
        public int Id { get; set; }
        public string? Aciklama { get; set; }
        public decimal Tutar { get; set; }
        public string IslemTuru { get; set; } = "BORC"; // BORC veya ALACAK
        public DateTime Tarih { get; set; } = DateTime.Now;
        public int HesapKodu { get; set; } // ✅ Doğru olan (SQL ile aynı)
        public string Durum { get; set; } = "Onaylandi";   
    }
}