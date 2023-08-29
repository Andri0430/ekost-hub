using server.Models;

namespace server.Dto
{
    public class GetFavorit
    {
        public int Id { get; set; }
        public Kost Kost { get; set; }
        public Account Account { get; set; }
    }
}
