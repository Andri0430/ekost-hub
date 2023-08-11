namespace Server.Models
{
    public class DetailKost
    {
        public string Description { get; set; } = string.Empty;
        public List<Fasilitas> Fasilitas { get; set; }
    }
}
