namespace FinansSistemi.API.Models
{
    public class ZamanKaydi
    {
        public int Id { get; set; }
        public int PersonelId { get; set; }
        public string? PersonelAd { get; set; }
        public DateTime Tarih { get; set; }
        public string? KayitTuru { get; set; } // Yıllık İzin, Rapor, Mesai, Çalışma
        public double Saat { get; set; }
        public string? Durum { get; set; } // Onaylandı, Bekliyor
    }
}