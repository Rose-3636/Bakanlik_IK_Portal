namespace FinansSistemi.API.Models
{
    public class TimeEntry
    {
        public int Id { get; set; }
        public string? EmployeeName { get; set; }
        public DateTime Date { get; set; }
        public string? EntryType { get; set; } // Normal Çalışma, Yıllık İzin, Fazla Mesai
        public string? Hours { get; set; } // Örn: 08:00
        public string? Status { get; set; } // Onaylandı, Bekliyor
    }
}