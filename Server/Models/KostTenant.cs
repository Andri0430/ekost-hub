using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class KostTenant
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Account Account { get; set; }
        public Kost Kost { get; set; }
        public string TanggalMasuk { get; set; }
        public int LamaKost { get; set; }
        public int TotalBiaya { get; set; }
    }
}