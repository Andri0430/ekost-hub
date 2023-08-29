using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using server.Models;

namespace server.Dto
{
    public class GetTenantDto
    {
        public string Name { get; set; } = string.Empty;
        public string Foto { get; set; } = string.Empty;
        public string TanggalMasuk { get; set; } = string.Empty;
        public int LamaKost { get; set; }
        public int TotalBiaya { get; set; }
    }
}
