namespace Server.Models
{
    public class Fasilitas
    {
        public List<FasilitasKamar> FasilitasKamar { get; set; }
        public List<FasilitasToilet> FasilitasToilet { get; set; }
        public List<FasilitasUmum> FasilitasUmum { get; set; }
    }
}
