using Microsoft.AspNetCore.Mvc;

namespace FinansSistemi.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayrollController : ControllerBase
    {
        [HttpGet("calculate/{brutMaas}")]
        public IActionResult Calculate(decimal brutMaas)
        {
            // --- PROFESYONEL VERGİ HESAPLAMA ---
            decimal sskIsci = brutMaas * 0.14m;            // %14 SGK
            decimal issizlikIsci = brutMaas * 0.01m;       // %1 İşsizlik
            decimal gelirVergisiMatrahi = brutMaas - (sskIsci + issizlikIsci);
            decimal gelirVergisi = gelirVergisiMatrahi * 0.15m; // %15 İlk Vergi Dilimi
            decimal damgaVergisi = brutMaas * 0.00759m;    // Damga Vergisi

            decimal toplamKesinti = sskIsci + issizlikIsci + gelirVergisi + damgaVergisi;
            decimal netMaas = brutMaas - toplamKesinti;

            // React'a (Frontend) gidecek veri paketi
            return Ok(new
            {
                Brut = brutMaas,
                Ssk = Math.Round(sskIsci + issizlikIsci, 2),
                GelirVergisi = Math.Round(gelirVergisi, 2),
                DamgaVergisi = Math.Round(damgaVergisi, 2),
                Net = Math.Round(netMaas, 2),
                KesintiToplami = Math.Round(toplamKesinti, 2)
            });
        }
    }
}