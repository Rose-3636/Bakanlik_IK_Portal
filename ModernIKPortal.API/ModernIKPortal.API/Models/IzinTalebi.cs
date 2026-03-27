public class IzinTalebi
{
    public int Id { get; set; }
    public int PersonelId { get; set; }
    public string? IzinTuru { get; set; }
    public DateTime BaslangicTarihi { get; set; }
    public DateTime BitisTarihi { get; set; }
    public string? Durum { get; set; } = "Bekliyor";
    public string? Aciklama { get; set; }
}