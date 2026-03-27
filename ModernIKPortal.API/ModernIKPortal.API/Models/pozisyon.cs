namespace ModernIKPortal.API.Models
{
    public class Pozisyon
    {
        public int Id { get; set; }
        public string PozisyonAdi { get; set; } = string.Empty;
        public bool AcikMi { get; set; } = true;
    }
}