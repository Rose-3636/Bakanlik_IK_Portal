namespace FinansSistemi.API.Models
{
    public class Payroll
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal BrutMaas { get; set; }
        public decimal NetMaas { get; set; }
        public decimal VergiKesintisi { get; set; }
        public decimal SigortaKesintisi { get; set; }
        public string Donem { get; set; } = "Mart 2026";
    }
}