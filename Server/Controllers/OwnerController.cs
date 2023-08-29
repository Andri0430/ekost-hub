using server.Helpers;
using server.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using server.Dto;
using server.Data;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        private readonly IAkun _accountService;
        private readonly IKost _kostService;
        private readonly EkostContext _context;
        public OwnerController(IAkun accountService, IKost kostService, EkostContext context)
        {
            _accountService = accountService;
            _kostService = kostService;
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllOwners()
        {
            var accounts = _accountService.GetAllAccounts();
            return Ok(accounts);
        }

        [HttpPost("add-kost"), Authorize(Roles = "Owner")]
        public IActionResult CreateKost(AddKostDto addKostDto)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var owner = _accountService.GetAccountByEmail(email!);
            var kostName = _kostService.GetKostByKostName(addKostDto.KostName);

            if (kostName != null) return BadRequest(new { status = 400, message = "Nama kost sudah pernah digunakan" });

            var createKost = _kostService.CreateKost(addKostDto, owner);
            return Ok(new { createKost, status = 200, message = "Kost Berhasil ditambahkan" });
        }

        [HttpPost("kos/deskripsi")]
        public IActionResult AddDescriptionKost(DescriptionDto descriptionDto)
        {
            var kost = _kostService.Deskripsi(descriptionDto);
            if (kost == false) return BadRequest(new { status = 400 , message = "Id Kost Tidak Ditemukan"});
            return Ok(new { status = 200, message = "Berhasil Menambahkan Deskripsi" });
        }

        [HttpPost("kos/upload-foto")]
        public async Task<IActionResult> UploadFotoKos([FromForm] UploadFotoKosDto uploadFoto)
        {
            var kostToUploadFoto = _context.Kosts
                .Where(k => k.Id == uploadFoto.IdKost).FirstOrDefault()!;

            if (ModelState.IsValid)
            {
                string uploadFotoFileName = await UploadFoto.FotoUpload(uploadFoto.Foto);

                if (uploadFotoFileName.StartsWith("Invalid file format")) return BadRequest(uploadFotoFileName);
                if (uploadFotoFileName.StartsWith("Batas Ukuran File")) return BadRequest(uploadFotoFileName);

                kostToUploadFoto.KostImage = uploadFotoFileName;
                _context.SaveChanges();

                return Ok("Foto Kost Berhasil Diperbarui");
            }
            return BadRequest("Gagal MengUpload Foto");
        }

        [HttpPost("get-kost")]
        public IActionResult GetKost(string email)
        {
            var kost = _context.Kosts
                .Include(k => k.Owner)
                .Where(k => k.Owner.Email == email).ToList();

            var kostByOwner = kost.Select(k => new
            {
                Id = k.Id,
                NamaKos = k.KostName,
            });

            return Ok(kostByOwner);
        }

        [HttpPut("update-kost")]
        public IActionResult UpdateKost(UpdateKostDto updateKost)
        {
            var kost = _context.Kosts
                .Include(k => k.Owner).ToList();

            var address = updateKost.alamat;
            string[] parts = address.Split(' ');

            string city = parts[0];
            string district = parts[1];
            string street = parts[2];

            if (parts.Length > 3)
            {
                street = string.Join(" ", parts, 2, parts.Length - 2);
            }

            var getKostId = kost.Where(k => k.Id == updateKost.idKost).FirstOrDefault();
            var getKostName = kost.Where(k => k.KostName == updateKost.namaKost).FirstOrDefault();


            if (getKostId == null)
                return BadRequest(new { status = 400, message = "Id Kost Tidak Ditemukan" });

            if (getKostName != null && updateKost.namaKost != getKostName.KostName)
                return BadRequest(new { status = 400, message = "Nama Kost Telah Digunakan" });

            if (getKostId.QtyRoom < updateKost.sisa)
                return BadRequest(new { status = 400, message = "Kuota Kamar Tidak Sesuai" });

            getKostId.KostName = updateKost.namaKost;
            getKostId.KostType = updateKost.tipeKost;
            getKostId.KostPrice = updateKost.harga;
            getKostId.QtyRoom = updateKost.sisa;
            getKostId.City = city;
            getKostId.District = district;
            getKostId.Street = street;

            _context.Kosts.Update(getKostId);
            _context.SaveChanges();
            return Ok(new { status = 200, message = "Update Profile Kost berhasil" });
        }
    }
}