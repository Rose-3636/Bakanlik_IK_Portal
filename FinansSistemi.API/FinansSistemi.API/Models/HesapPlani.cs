namespace FinansSistemi.API.Models
{
    public class HesapPlani
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int HesapKodu { get; set; }
        public string HesapAdi { get; set; } = string.Empty;
        public string? HesapTuru { get; set; }
        public decimal Bakiye { get; set; }
    }
}