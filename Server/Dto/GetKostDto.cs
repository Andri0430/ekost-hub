using server.Models;

namespace server.Dto
{
    public class GetKostDto
    {
        public int Id { get; set; }
        public string KostName { get; set; } = string.Empty;
        public string? KostImage { get; set; }
        public int KostPrice { get; set; }
        public string KostType { get; set; } = string.Empty;
        public string KostAdress { get; set; } = string.Empty;
        public int QtyRoom { get; set; }
    }
}