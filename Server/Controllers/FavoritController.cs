using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Dto;
using server.Interface;
using System.Security.Claims;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritController : ControllerBase
    {
        private readonly IKost _kostService;
        private readonly EkostContext _context;
        public FavoritController(IKost kostService, EkostContext context)
        {
            _kostService = kostService;
            _context = context;
        }

        [HttpGet]
        public IActionResult GetFavorit(string email)
        {
            var favorits = _context.Favorits.Where(f => f.Email == email).ToList();

            var favoritByUser = favorits.Select(favorits => new GetFavorit
            {
                Account = _context.Accounts.Where(a => a.Email == favorits.Email).FirstOrDefault()!,
                Kost = _context.Kosts.Where(k => k.Id == favorits.KostId).FirstOrDefault()!
            }).ToList();

            var kostFavorit = favoritByUser.Select(favoritByUser => new
            {
                idKos = favoritByUser.Kost.Id,
                GambarKost = favoritByUser.Kost.KostImage,
                NamaKost = favoritByUser.Kost.KostName,
                TypeKost = favoritByUser.Kost.KostType,
                HargaKost = favoritByUser.Kost.KostPrice
            });

            return Ok(kostFavorit);
        }

        [HttpPost("kos"), Authorize]
        public IActionResult AddFavorit([FromBody]int idKost)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var favorit = new FavoritDto { Email = email!, IdKost = idKost };

            if (_kostService.Favorit(favorit) == false)
                return BadRequest(new {status = 400 , message = "Gagal Menambahkan ke Favorit!" });

            return Ok(new { status = 200, message = "Berhasil Menambahkan ke Favorit!" });
        }

        [HttpDelete,Authorize]
        public IActionResult DeleteFavorit([FromBody]int idKost)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var favorit = new FavoritDto { Email = email!, IdKost = idKost };

            if (_kostService.DeleteFavorit(favorit) == false)
                return BadRequest(new { status = 400, message = "Gagal Menghapus Favorit!" });

            return Ok(new { status = 200, message = "Berhasil Menghapus dari Favorit!" });
        }
    }
}
