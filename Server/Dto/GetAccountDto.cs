namespace server.Dto
{
    public class GetAccountDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Foto { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
