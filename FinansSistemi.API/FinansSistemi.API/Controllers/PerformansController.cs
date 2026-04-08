using FinansSistemi.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModernIKPortal.API.Models;

namespace ModernIKPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerformansController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PerformansController(AppDbContext context)
        {
            _context = context;
        }

        // 1. TÜM NOTLARI LİSTELE
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PerformansNotu>>> GetNotlar()
        {
            return await _context.PerformansNotlari.ToListAsync();
        }

        // 2. YENİ NOT EKLE
        [HttpPost]
        public async Task<ActionResult> Ekle(PerformansNotu not)
        {
            _context.PerformansNotlari.Add(not);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}