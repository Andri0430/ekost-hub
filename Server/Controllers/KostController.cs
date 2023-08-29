using server.Helpers;
using server.Interface;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KostController : ControllerBase
    {
        private readonly IKost _kostService;
        public KostController(IKost kostService)
        {
            _kostService = kostService;
        }

        [HttpGet]
        public IActionResult GetAllKost()
        {
            return Ok(_kostService.GetAllKost());
        }

        [HttpGet("type-kost")]
        public IActionResult GetKostByTypeKost(string typeKost)
        {
            var kost = _kostService.GetKostByTypeKost(typeKost);
            if (kost.Count == 0) return BadRequest("Kost tidak ditemukan");
            return Ok(kost);
        }

        [HttpGet("city")]
        public IActionResult GetAllKostByCity(string city)
        {
            var kost = _kostService.GetKostByCity(city);
            if (kost == null) return BadRequest("Kost tidak ditemukan");
            return Ok(kost);
        }

        [HttpGet("name")]
        public IActionResult GetKostByName(string name)
        {
            var kost = _kostService.GetKostByKostName(name);
            if (kost == null) return BadRequest("Kost tidak ditemukan");
            return Ok(kost);
        }

        [HttpPost("id")]
        public IActionResult GetDetailKostById(int id)
        {
            var kost = _kostService.DetailKost(id);
            if (kost == null) return BadRequest("Kost tidak ditemukan");
            return Ok(kost);
        }
    }
}