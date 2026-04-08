namespace FinansSistemi.API.Models
{
    public class PayrollRecord
    {
        public decimal BrutMaas { get; set; }
        public decimal NetMaas { get; set; }
        public decimal SskKesintisi { get; set; }
        public decimal VergiKesintisi { get; set; }
        public decimal DamgaVergisi { get; set; }
        public string Donem { get; set; } = "Mart 2026";
    }
}