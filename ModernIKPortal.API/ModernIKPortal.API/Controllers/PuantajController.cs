using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModernIKPortal.API.Models;

namespace ModernIKPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PuantajController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PuantajController(AppDbContext context)
        {
            _context = context;
        }

        // 1. LİSTELEME: SQL'deki tüm puantajları getirir
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PuantajKaydi>>> GetPuantajlar()
        {
            return await _context.PuantajKayitlari.ToListAsync();
        }

        // 2. KAYDETME: React'tan gelen tıklamayı SQL'e yazar
        [HttpPost]
        public async Task<ActionResult> Kaydet(PuantajKaydi yeniKayit)
        {
            var mevcutKayit = await _context.PuantajKayitlari
                .FirstOrDefaultAsync(x => x.PersonelId == yeniKayit.PersonelId && x.Gun == yeniKayit.Gun);

            if (mevcutKayit != null)
            {
                mevcutKayit.Durum = yeniKayit.Durum;
            }
            else
            {
                _context.PuantajKayitlari.Add(yeniKayit);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}