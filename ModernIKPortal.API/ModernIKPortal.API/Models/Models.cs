namespace ModernIKPortal.API.Models
{
    public class Personel
    {
        public int Id { get; set; }
        public string Ad { get; set; } = string.Empty;
        public string Soyad { get; set; } = string.Empty;
        public string? Departman { get; set; }
      
        public decimal Maas { get; set; }
        public DateTime IseGirisTarihi { get; set; } = DateTime.Now;
        public string? ResimUrl { get; set; }
    }
}