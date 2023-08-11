namespace Server.Models
{
    public class Kost
    {
        public int Id { get; set; }
        public string KostName { get; set; } = string.Empty;
        public string Gambar { get; set; } = string.Empty;
        public int Price { get; set; }
        public string TypeKost { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DetailKost DetailKost { get; set; }
    }
}
