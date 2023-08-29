using Microsoft.AspNetCore.Mvc;
using server.Dto;
using server.Models;

namespace server.Interface
{
    public interface IKost
    {
        GetKostDto CreateKost(AddKostDto addKostDto, GetAccountDto account);
        ICollection<GetKostDto> GetAllKost();
        ICollection<GetKostDto> GetKostByCity(string city);
        ICollection<GetKostDto> GetKostByTypeKost(string typeKost);
        GetKostDto GetKostByKostName(string kostName);
        GetDetailKostDto DetailKost(int id);
        GetKostDto GetKostById(int id);
        bool Deskripsi(DescriptionDto descriptionDto);
        bool Favorit(FavoritDto favoritDto);
        bool DeleteFavorit(FavoritDto favoritDto);
    }
}