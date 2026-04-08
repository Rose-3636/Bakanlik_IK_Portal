using System;

namespace FinansSistemi.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? FullName { get; set; }
        public string? Role { get; set; }
        public string? Department { get; set; }
        public string? TC { get; set; }
        public decimal? Salary { get; set; }
        public DateTime? HireDate { get; set; }
    }
}