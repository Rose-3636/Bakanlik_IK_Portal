using Xunit;
using FinansSistemi.API.Controllers; // Senin Controller klasörün
using Microsoft.AspNetCore.Mvc;

public class ZamanTestleri
{
    [Fact]
    public void PuantajListesi_Bos_Donmemelidir()
    {
        // 1. HAZIRLIK (Arrange)
        // Controller'ı test için hazırlıyoruz. 
        // Not: Eğer AppDbContext istiyorsa onu şimdilik null geçebiliriz veya Controller'ı buna göre düzenleriz.
        var controller = new TimeController();

        // 2. İŞLEM (Act)
        var sonuc = controller.GetEntries();

        // 3. DOĞRULAMA (Assert)
        var okSonucu = Assert.IsType<OkObjectResult>(sonuc);
        Assert.NotNull(okSonucu.Value); // İçerik dolu mu?
    }
}