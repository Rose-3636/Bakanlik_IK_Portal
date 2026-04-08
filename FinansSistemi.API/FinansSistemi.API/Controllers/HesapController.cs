using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinansSistemi.API.Models;

namespace FinansSistemi.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HesapController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HesapController(AppDbContext context)
        {
            _context = context;
        }

        // 1. HESAPLARI LİSTELE (Kasa Bakiyesi İçin)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HesapPlani>>> GetHesaplar()
        {
            return await _context.HesapPlani.ToListAsync();
        }

        // 2. YEVMİYE DEFTERİ (İşlem Geçmişi Tablosu İçin)
        [HttpGet("Yevmiye")]
        public async Task<ActionResult<IEnumerable<FinansalHareketler>>> GetYevmiye()
        {
            return await _context.FinansalHareketler.OrderByDescending(x => x.Tarih).ToListAsync();
        }

        // 3. YENİ İŞLEM EKLEME (Bakiyeyi de Otomatik Günceller)
        [HttpPost("IslemEkle")]
        public async Task<ActionResult> IslemEkle(FinansalHareketler yeniHareket)
        {
            // KURAL BURADA: Eğer 10.000 TL ve üzerindeyse 'Bekliyor' olarak işaretle
            if (yeniHareket.Tutar >= 10000)
            {
                yeniHareket.Durum = "Bekliyor";
            }
            else
            {
                yeniHareket.Durum = "Onaylandi";
                // 10.000 altındaysa parayı hemen kasadan düş
                var hesap = await _context.HesapPlani.FirstOrDefaultAsync(h => h.HesapKodu == yeniHareket.HesapKodu);
                if (hesap != null)
                {
                    if (yeniHareket.IslemTuru == "BORC") hesap.Bakiye += yeniHareket.Tutar;
                    else hesap.Bakiye -= yeniHareket.Tutar;
                }
            }

            _context.FinansalHareketler.Add(yeniHareket);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // 4. SİSTEM DURUMU (Teknik Bilgiler İçin)
        [HttpGet("SistemDurum")]
        public async Task<ActionResult> GetSistemDurum()
        {
            return Ok(new
            {
                Kullanici = "GÜL DOĞAN",
                SistemSaati = DateTime.Now.ToString("HH:mm:ss"),
                Tarih = DateTime.Now.ToString("dd.MM.yyyy"),
                IsletimSistemi = Environment.OSVersion.ToString(),
                SunucuAdi = Environment.MachineName,
                VeritabaniSurumu = "MS SQL Server 2022",
                UygulamaVersiyonu = "v1.0.6 - Pro"
            });
        }

        // HesapController.cs içine en alta ekleyin:

        [HttpPut("Onayla/{id}")]
        public async Task<ActionResult> Onayla(int id)
        {
            // 1. İşlemi bul
            var hareket = await _context.FinansalHareketler.FindAsync(id);
            if (hareket == null) return NotFound();

            // 2. Eğer zaten onaylıysa bir şey yapma
            if (hareket.Durum == "Onaylandi") return BadRequest("Bu işlem zaten onaylanmış.");

            // 3. Durumu güncelle
            hareket.Durum = "Onaylandi";

            // 4. SİHİRLİ DOKUNUŞ: Şimdi parayı gerçekten kasadan düşüyoruz!
            var hesap = await _context.HesapPlani.FirstOrDefaultAsync(h => h.HesapKodu == hareket.HesapKodu);
            if (hesap != null)
            {
                if (hareket.IslemTuru == "BORC") hesap.Bakiye += hareket.Tutar;
                else hesap.Bakiye -= hareket.Tutar;
            }

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}