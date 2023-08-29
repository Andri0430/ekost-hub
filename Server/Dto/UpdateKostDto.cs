using Microsoft.AspNetCore.Mvc;

namespace server.Dto
{
    public class UpdateKostDto
    {
        public int idKost { get; set; }
        public string namaKost { get; set; } = string.Empty;
        public string tipeKost { get; set; } = string.Empty;
        public string alamat { get; set; } = string.Empty;
        public int harga { get; set; }
        public int sisa { get; set; }

    }
}
