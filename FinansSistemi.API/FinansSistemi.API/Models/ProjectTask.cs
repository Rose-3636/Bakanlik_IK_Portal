namespace FinansSistemi.API.Models
{
    public class ProjectTask
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string Status { get; set; } = "Yapılacak";
        public string Priority { get; set; } = "Orta";
        public string AssignedTo { get; set; } = "Gül Doğan";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}