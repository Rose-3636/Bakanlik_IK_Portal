using Microsoft.EntityFrameworkCore;
using ModernIKPortal.API.Models;

var builder = WebApplication.CreateBuilder(args);

// 1. Veritabanı Bağlantısını Tanıtıyoruz
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. CORS Ayarı (Frontend'in bağlanabilmesi için kapıyı açıyoruz)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger ve Middleware ayarları
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // Bu satırı ekleyin

// CORS'u aktif ediyoruz
app.UseCors("AllowReact");

app.UseAuthorization();
app.MapControllers();

app.Run();