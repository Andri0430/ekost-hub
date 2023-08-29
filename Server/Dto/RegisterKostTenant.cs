namespace server.Dto
{
    public class RegisterKostTenant
    {
        public int IdKost { get; set; }
        public string Email { get; set; } = string.Empty;
        public string TanggalMasuk { get; set; } = string.Empty;
        public string LamaKost { get; set; } = string.Empty;
        public int Biaya { get; set; }
    }
}