using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Dto;
using server.Helpers;
using server.Interface;
using System.Security.Claims;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly EkostContext _context;
        private readonly IAkun _accountService;

        public AccountController(EkostContext context, IAkun akun)
        {
            _context = context;
            _accountService = akun;
        }


        [HttpGet("GetMe"), Authorize]
        public IActionResult GetMe()
        {
            var emailClaims = User.FindFirstValue(ClaimTypes.Email);
            var account = _accountService.GetAccountByEmail(emailClaims!);
            return Ok(account);
        }

        [HttpPost("UploadFoto"), Authorize]
        public async Task<IActionResult> AddPhoto([FromForm] UploadFotoDto uploadFoto)
        {
            var emailClaims = User.FindFirstValue(ClaimTypes.Email);

            var accountToUpdate = _context.Accounts
                .Where(a => a.Email == emailClaims).FirstOrDefault();

            if (ModelState.IsValid)
            {
                string uploadFotoFileName = await UploadFoto.FotoUpload(uploadFoto.Foto);

                if (uploadFotoFileName.StartsWith("Invalid file format")) return BadRequest(new {status = 400, message = uploadFotoFileName });
                if (uploadFotoFileName.StartsWith("Batas Ukuran File")) return BadRequest(new {status = 400, message = uploadFotoFileName });

                accountToUpdate!.Foto = uploadFotoFileName;
                _context.SaveChanges();

                return Ok(new {status = 200, message = "Berhasil Upload Foto" });
            }
            return BadRequest(new {status = 200, message = "Gagal MengUpload Foto" });
        }

        [HttpPut("update-name")]
        public IActionResult UpdateNameAccount(UpdateNameDto updateName)
        {
            var account = _accountService.UpdateName(updateName);
            if (account == false) return BadRequest(new {status = 400, message = "Update Nama Tidak Berhasil!!!"});
            return Ok(new { status = 200, message = "Update Nama Berhasil" });
        }

        [HttpPut("update-phone")]
        public IActionResult UpdatePhoneAccountt(UpdatePhoneDto updatePhone)
        {
            var account = _accountService.UpdatePhone(updatePhone);
            if (account == false) return BadRequest(new { status = 400, message = "Update No.Telepon Gagal" });
            return Ok(new { status = 200, message = "Update No.Telepon Berhasil" });
        }
    }
}