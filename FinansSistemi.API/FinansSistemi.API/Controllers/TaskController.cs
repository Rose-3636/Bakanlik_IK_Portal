using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinansSistemi.API.Models; // Modellerine ulaşmak için

namespace FinansSistemi.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        // 1. TÜM GÖREVLERİ GETİR (GET)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectTask>>> GetTasks()
        {
            return await _context.ProjectTasks.ToListAsync();
        }

        // 2. YENİ GÖREV EKLE (POST)
        [HttpPost]
        public async Task<ActionResult<ProjectTask>> CreateTask(ProjectTask task)
        {
            _context.ProjectTasks.Add(task);
            await _context.SaveChangesAsync();
            return Ok(task);
        }

        // 3. GÖREV SİL (DELETE)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.ProjectTasks.FindAsync(id);
            if (task == null) return NotFound();

            _context.ProjectTasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}