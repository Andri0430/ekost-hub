using server.Data;
using Microsoft.AspNetCore.Mvc;
using server.Dto;
using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KostTenantController : ControllerBase
    {
        private readonly EkostContext _context;
        public KostTenantController(EkostContext context)
        {
            _context = context;
        }

        [HttpPost]
        public ActionResult AddKostTenants(RegisterKostTenant registerKostTenant)
        {
            var lamaKost = registerKostTenant.LamaKost.FirstOrDefault(c => char.IsDigit(c));
            int nilaiAngka = lamaKost - '0';

            var kostTenantChecked = _context.KostTenants
                .Include(kt => kt.Kost)
                .Include(kt => kt.Account)
                .Where(k => k.Account.Email == registerKostTenant.Email && k.Kost.Id == registerKostTenant.IdKost).FirstOrDefault();

            if (!ModelState.IsValid) return BadRequest(new { status = 400, message = "Data Tidak Lengkap" });
            if(kostTenantChecked != null) return BadRequest(new { status = 400, message = "Anda Sudah Terdaftar di Kost Ini" });

            var register = new KostTenant
            {
                Account = _context.Accounts.Where(a => a.Email == registerKostTenant.Email).FirstOrDefault()!,
                Kost = _context.Kosts.Where(k => k.Id == registerKostTenant.IdKost).FirstOrDefault()!,
                TanggalMasuk = registerKostTenant.TanggalMasuk,
                LamaKost = nilaiAngka,
                TotalBiaya = nilaiAngka * registerKostTenant.Biaya
            };
            _context.KostTenants.Add(register);
            _context.SaveChanges();

            return Ok(new { status = 200, message = "Sewa Kost Berhasil" });
        }

        [HttpGet("get-by-idKost")]
        public IActionResult GetKostTenantByIdKost(int idKost)
        {
            var kostTenantChecked = _context.KostTenants
                .Include(kt => kt.Kost)
                .Include(kt => kt.Account)
                .Where(kt => kt.Kost.Id == idKost).ToList();

            if (kostTenantChecked == null)
                return BadRequest(new { status = 400, message = "Tidak ada penghuni Kost" });

            var kostTenant = kostTenantChecked.Select(kt => new GetTenantDto
            {
                Name = kt.Account.Name,
                Foto = kt.Account.Foto!,
                TanggalMasuk = kt.TanggalMasuk,
                LamaKost = kt.LamaKost,
                TotalBiaya = kt.TotalBiaya
            });
            return Ok(kostTenant );
        }
    }
}
