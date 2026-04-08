using FinansSistemi.API.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. VERİTABANI BAĞLANTISI
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. CORS AYARI (React bağlantısı için)
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddControllers();

// 3. SWAGGER SERVİSLERİNİ EKLEYELİM (Eksik olan ve hatayı yaptıran yer burasıydı)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // Bu satır Swagger'ın çalışması için şart!

var app = builder.Build();

// 4. SWAGGER GÖRSEL EKRANINI AKTİF EDELİM
// Geliştirme aşamasında olduğumuz için her zaman açık kalsın:
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Finans API v1");
    c.RoutePrefix = "swagger"; // Adres: localhost:xxxx/swagger olacak
});

app.UseHttpsRedirection();

// 5. CORS'U AKTİF EDİYORUZ
app.UseCors("AllowAll");

app.UseAuthorization();
app.MapControllers();

app.Run();