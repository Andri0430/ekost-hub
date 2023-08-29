using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Account
    {
        [Key]
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Foto { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public string Role { get; set; }
    }
}