using FinansSistemi.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinansSistemi.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // --- 1. GİRİŞ YAPMA (LOGIN) ---
        // AuthController.cs içinde login metodunu şu şekilde güncelle:
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginVerisi)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x =>
                x.Username == loginVerisi.Username &&
                x.Password == loginVerisi.Password);

            if (user == null) return Unauthorized(new { message = "Hatalı giriş!" });

            return Ok(new { success = true, fullName = user.FullName, role = user.Role });
        }

        // --- 2. TÜM PERSONELLERİ LİSTELE (İleride lazım olacak) ---
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            // Burayı da Users olarak güncelledik
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

    } // Class Sonu
} // Namespace Sonu