using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KostController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            List<Kost> kostList = Data.Data.ListData();
            var kostResponse = kostList.Select(kostList => new KostDto
            {
                Id = kostList.Id,
                KostName = kostList.KostName,
                Gambar = kostList.Gambar,
                Price = kostList.Price,
                TypeKost = kostList.TypeKost,
                Address = kostList.Address,
            }).ToList();

            return Ok(kostResponse);
        }

        [HttpGet("id")]
        public IActionResult GetKostById(int id)
        {
            List<Kost> kostList = Data.Data.ListData();
            var kost = kostList.Where(k => k.Id == id).FirstOrDefault();
            return Ok(kost);
        }
    }
}