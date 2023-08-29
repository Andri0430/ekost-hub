using server.Data;
using server.Dto;
using server.Interface;
using server.Models;

namespace server.Repository
{
    public class AkunRepo : IAkun
    {
        private readonly EkostContext _context;
        public AkunRepo(EkostContext context)
        {
            _context = context;
        }
        public GetAccountDto GetAccountByEmail(string email)
        {
            var account = _context.Accounts
                .Where(a => a.Email == email).FirstOrDefault();

            if (account != null)
                return new GetAccountDto
                {
                    Name = account.Name,
                    Foto = account.Foto,
                    Email = account.Email,
                    PhoneNumber = account.PhoneNumber,
                    Role = account.Role.ToString()
                };
            return null!;
        }

        public GetAccountDto GetAccountByName(string name)
        {
            var account = _context.Accounts
                 .Where(a => a.Name == name).FirstOrDefault();

            if (account != null)
                return new GetAccountDto
                {
                    Name = account.Name,
                    Foto = account.Foto,
                    Email = account.Email,
                    PhoneNumber = account.PhoneNumber,
                    Role = account.Role.ToString()
                };
            return null!;
        }

        public GetAccountDto GetAccountByPhoneNumber(string phone)
        {
            var account = _context.Accounts
                .Where(a => a.PhoneNumber == phone).FirstOrDefault();

            if (account != null)
                return new GetAccountDto
                {
                    Name = account.Name,
                    Foto = account.Foto,
                    Email = account.Email,
                    PhoneNumber = account.PhoneNumber,
                    Role = account.Role.ToString()
                };
            return null!;
        }

        public ICollection<GetAccountDto> GetAllAccountByRole(string role)
        {
            var accounts = _context.Accounts
               .Where(a => a.Role.ToString() == role).ToList();

            return accounts.Select(accounts => new GetAccountDto
            {
                Name = accounts.Name,
                Foto = accounts.Foto,
                Email = accounts.Email,
                PhoneNumber = accounts.PhoneNumber,
                Role = accounts.Role.ToString()
            }).ToList();
        }

        public ICollection<GetAccountDto> GetAllAccounts()
        {
            var accounts = _context.Accounts.ToList();

            return accounts.Select(accounts => new GetAccountDto
            {
                Name = accounts.Name,
                Foto = accounts.Foto,
                Email = accounts.Email,
                PhoneNumber = accounts.PhoneNumber,
                Role = accounts.Role.ToString(),
            }).ToList();
        }

        public Account IsAccountChecked(LoginDto loginDto)
        {
            var accounts = _context.Accounts
               .Where(a => a.Email == loginDto.Email && a.Role == loginDto.Role.ToString()).FirstOrDefault()!;

            if (accounts != null) return accounts;
            return null!;
        }

        public void RegisterAccount(RegisterDto registerDto)
        {
            var addAccount = new Account
            {
                Name = registerDto.Name,
                Foto = "Profil.png",
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
                Password = registerDto.Password,
                Role = registerDto.Role.ToString()
            };
            _context.Accounts.Add(addAccount);
            _context.SaveChanges();
        }

        public bool UpdateName(UpdateNameDto updateName)
        {
            var account = _context.Accounts
                .Where(a => a.Email == updateName.Email).FirstOrDefault();

            account!.Name = updateName.Name;
            _context.Accounts.Update(account);
            _context.SaveChanges();
            return true;
        }

        public bool UpdatePhone(UpdatePhoneDto updatePhone)
        {
            var account = _context.Accounts
                .Where(a => a.Email == updatePhone.Email).FirstOrDefault();

            if (account!.PhoneNumber != null && updatePhone.Phone == account.PhoneNumber)
                return false;

            account!.PhoneNumber = updatePhone.Phone;
            _context.Accounts.Update(account);
            _context.SaveChanges();
            return true;
        }
    }
}