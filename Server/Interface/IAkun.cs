using server.Dto;
using server.Models;

namespace server.Interface
{
    public interface IAkun
    {
        void RegisterAccount(RegisterDto registerDto);
        GetAccountDto GetAccountByName(string name);
        GetAccountDto GetAccountByEmail(string email);
        GetAccountDto GetAccountByPhoneNumber(string phone);
        ICollection<GetAccountDto> GetAllAccounts();
        ICollection<GetAccountDto> GetAllAccountByRole(string role);
        Account IsAccountChecked(LoginDto loginDto);
        bool UpdateName(UpdateNameDto updateName);
        bool UpdatePhone(UpdatePhoneDto updatePhone);
    }
}