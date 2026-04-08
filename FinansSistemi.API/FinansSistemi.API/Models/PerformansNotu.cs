namespace ModernIKPortal.API.Models
{
    public class PerformansNotu
    {
        public int Id { get; set; }
        public int PersonelId { get; set; } // Hangi personel?
        public int Puan { get; set; }
        public string? Yorum { get; set; }
        public string? Donem { get; set; }
        public DateTime Tarih { get; set; } = DateTime.Now;
    }
}