using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;

namespace server.Models
{
    public class Kost
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string KostName { get; set; } = string.Empty;
        public string? KostImage { get; set; } = string.Empty;
        public int KostPrice { get; set; }
        public string KostType { get; set; } = string.Empty;
        public int QtyRoom { get; set; }
        public string? Description { get; set; }
        public string City { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
        public string Street { get; set; } = string.Empty;
        public Account Owner { get; set; }
    }
}