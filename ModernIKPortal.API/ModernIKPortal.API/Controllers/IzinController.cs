using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModernIKPortal.API.Models;

namespace ModernIKPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IzinController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IzinController(AppDbContext context)
        {
            _context = context;
        }

        // 1. Tüm İzin Taleplerini Getir
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IzinTalebi>>> GetIzinler()
        {
            return await _context.IzinTalepleri.ToListAsync();
        }

        // 2. Yeni İzin Talebi Oluştur
        [HttpPost]
        public async Task<ActionResult> IzinIsteme(IzinTalebi talep)
        {
            _context.IzinTalepleri.Add(talep);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // 3. İzin Onaylama veya Reddetme
        [HttpPut("{id}/durum")]
        public async Task<IActionResult> DurumGuncelle(int id, [FromBody] string yeniDurum)
        {
            var talep = await _context.IzinTalepleri.FindAsync(id);
            if (talep == null) return NotFound();

            talep.Durum = yeniDurum;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpPut("{id}/onayla")]
        public async Task<IActionResult> Onayla(int id)
        {
            var talep = await _context.IzinTalepleri.FindAsync(id);
            if (talep == null) return NotFound();
            talep.Durum = "Onaylandı";
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}