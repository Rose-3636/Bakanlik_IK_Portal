namespace ModernIKPortal.API.Models
{
    public class PuantajKaydi
    {
        public int Id { get; set; }
        public int PersonelId { get; set; }
        public int Gun { get; set; }
        public int Ay { get; set; }
        public int Yil { get; set; }
        public string? Durum { get; set; }
    }
}