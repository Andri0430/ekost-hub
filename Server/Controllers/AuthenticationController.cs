using server.Dto;
using server.Helpers;
using server.Interface;
using server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAkun _accountService;
        private readonly IConfiguration _configuration;

        public AuthenticationController(IAkun accountService, IConfiguration configuration)
        {
            _accountService = accountService;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto registerDto)
        {
            var email = _accountService.GetAccountByEmail(registerDto.Email);
            var phone = _accountService.GetAccountByPhoneNumber(registerDto.PhoneNumber);

            if (email != null) return BadRequest(new {status = 400, message = "Email Telah Digunakan"});
            if (phone != null) return BadRequest(new { status = 400,message = "Nomor Telepon Telah Digunakan" });

            string saltPassword = BCrypt.Net.BCrypt.GenerateSalt();
            string hashPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.Password, saltPassword);

            registerDto.Password = hashPassword;
            _accountService.RegisterAccount(registerDto);

            return Ok(new { status = 200, message = "Register Berhasil" });
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto loginDto)
        {
            var account = _accountService.IsAccountChecked(loginDto);
            var email = _accountService.GetAccountByEmail(loginDto.Email);

            if (!ModelState.IsValid) return BadRequest(new { status = 400, message = "Data tidak boleh kosong!" });
            if (account == null) return BadRequest(new { status = 400, message = "Akun tidak terdaftar!" });
            if (email == null) return BadRequest(new { status = 400, message = "Email tidak terdaftar" });

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, account.Password))
                return BadRequest(new { status = 400, message = "Password Salah!" });

            string token = CreateToken(account);
            

            return Ok(new
            {
                status = 200,
                Message = "Login Berhasil",
                Token = token,
            });
        }

        private string CreateToken(Account accounts)
        {
            var account = _accountService.GetAccountByEmail(accounts.Email);

            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, account.Name),
                new Claim(ClaimTypes.Email, account.Email),
                new Claim(ClaimTypes.MobilePhone, account.PhoneNumber),
                new Claim(ClaimTypes.Role, account.Role)
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_configuration.GetSection("AppSettings:Token").Value!));

            var credential = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(5),
                    signingCredentials: credential
                    );

            var sendToken = new JwtSecurityTokenHandler().WriteToken(token);
            return sendToken;
        }
    }
}