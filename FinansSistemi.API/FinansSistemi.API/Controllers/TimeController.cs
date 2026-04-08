using Microsoft.AspNetCore.Mvc;
using FinansSistemi.API.Models;

namespace FinansSistemi.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetEntries()
        {
            // Mülakatlarda sunmak için örnek canlı veriler
            var list = new List<TimeEntry>
            {
                new TimeEntry { Id = 1, EmployeeName = "GÜL DOĞAN", Date = DateTime.Now, EntryType = "Normal Çalışma", Hours = "08:30", Status = "Onaylandı" },
                new TimeEntry { Id = 2, EmployeeName = "SILA BAŞAR", Date = DateTime.Now.AddDays(-1), EntryType = "Yıllık İzin", Hours = "1 Gün", Status = "Onaylandı" },
                new TimeEntry { Id = 3, EmployeeName = "AHMET ŞAHİN", Date = DateTime.Now, EntryType = "Fazla Mesai", Hours = "02:00", Status = "Bekliyor" }
            };
            return Ok(list);
        }
    }
}