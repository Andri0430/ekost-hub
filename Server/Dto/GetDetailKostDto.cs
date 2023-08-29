using server.Models;

namespace server.Dto
{
    public class GetDetailKostDto
    {
        public int IdKost { get; set; }
        public string KostName { get; set; } = string.Empty;
        public string? KostImage { get; set; } = string.Empty;
        public int KostPrice { get; set; }
        public string KostType { get; set; } = string.Empty;
        public string KostAdress { get; set; } = string.Empty;
        public int QtyRoom { get; set; }
        public string? Description { get; set; }
        public AccountDto PemilikKost { get; set; }
        public List<RoomFacility>? FasilitasKamar { get; set; }
        public List<ToiletFacility>? FasilitasToilet { get; set; }
        public List<GeneralFacility>? FasilitasUmum { get; set; }
        public List<Favorit>? Favorits { get; set; }
    }
}