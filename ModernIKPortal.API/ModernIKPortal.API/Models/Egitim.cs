namespace ModernIKPortal.API.Models
{
    public class Egitim
    {
        public int Id { get; set; }
        public string EgitimAdi { get; set; } = string.Empty;
        public bool YayinlandiMi { get; set; } = true;
    }
}