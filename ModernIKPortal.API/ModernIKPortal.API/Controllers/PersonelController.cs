using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModernIKPortal.API.Models;

namespace ModernIKPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonelController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PersonelController(AppDbContext context)
        {
            _context = context;
        }

        // 1. LİSTELEME (GET)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Personel>>> GetPersoneller()
        {
            return await _context.Personeller.ToListAsync();
        }

        // 2. EKLEME (POST)
        [HttpPost]
        public async Task<ActionResult<Personel>> PostPersonel(Personel personel)
        {
            _context.Personeller.Add(personel);
            await _context.SaveChangesAsync();
            return Ok(personel);
        }

        // 3. GÜNCELLEME (PUT)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersonel(int id, Personel personel)
        {
            if (id != personel.Id)
            {
                return BadRequest();
            }

            _context.Entry(personel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonelExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        // 4. SİLME (DELETE)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonel(int id)
        {
            var personel = await _context.Personeller.FindAsync(id);
            if (personel == null)
            {
                return NotFound();
            }

            _context.Personeller.Remove(personel);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("PozisyonSayisi")]
        public async Task<ActionResult<int>> GetPozisyonSayisi()
        {
            return await _context.Pozisyonlar.CountAsync();
        }

        [HttpGet("EgitimSayisi")]
        public async Task<ActionResult<int>> GetEgitimSayisi()
        {
            return await _context.Egitimler.CountAsync();
        }
        private bool PersonelExists(int id)
        {
            return _context.Personeller.Any(e => e.Id == id);
        }
    }
}