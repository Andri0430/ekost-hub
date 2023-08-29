using server.Models;

namespace server.Dto
{
    public class AddKostDto
    {
        public string KostName { get; set; } = string.Empty;
        public int KostPrice { get; set; }
        public int QtyRoom { get; set; }
        public string KostType { get; set; }
        public string City { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
        public string Street { get; set; } = string.Empty;
    }
}