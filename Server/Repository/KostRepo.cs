using server.Data;
using server.Dto;
using server.Interface;
using server.Models;
using Microsoft.EntityFrameworkCore;
using server.Enums;
using Newtonsoft.Json;

namespace server.Repository
{
    public class KostRepo : IKost
    {
        private readonly EkostContext _context;
        public KostRepo(EkostContext context)
        {
            _context = context;
        }

        public GetKostDto CreateKost(AddKostDto addKostDto, GetAccountDto account)
        {
            var address = $"{addKostDto.City} {addKostDto.District} {addKostDto.Street}";

            var addKost = new Kost
            {
                KostName = addKostDto.KostName,
                KostImage = "kkk.png",
                KostPrice = addKostDto.KostPrice,
                KostType = addKostDto.KostType,
                QtyRoom = addKostDto.QtyRoom,
                Description = null!,
                City = addKostDto.City,
                District = addKostDto.District,
                Street = addKostDto.Street,
                Owner = _context.Accounts.Where(a => a.Email == account.Email).FirstOrDefault()!
            };

            _context.Kosts.Add(addKost);
            _context.SaveChanges();

            return new GetKostDto
            {
                Id = addKost.Id,
                KostName = addKost.KostName,
                KostImage = addKost.KostImage!,
                KostPrice = addKost.KostPrice,
                KostType = addKost.KostType,
                KostAdress = address,
                QtyRoom = addKost.QtyRoom
            };
        }
        public ICollection<GetKostDto> GetAllKost()
        {
            var kost = _context.Kosts
                .Include(k => k.Owner)
                .ToList();

            if (kost != null)
            {
                return kost.Select(kost => new GetKostDto
                {
                    Id = kost.Id,
                    KostName = kost.KostName,
                    KostImage = kost.KostImage!,
                    KostType = kost.KostType,
                    KostPrice = kost.KostPrice,
                    KostAdress = $"{kost.City} {kost.District} {kost.Street}",
                    QtyRoom = kost.QtyRoom,
                }).ToList();
            }
            return null!;
        }

        public ICollection<GetKostDto> GetKostByCity(string city)
        {
            var kost = _context.Kosts
                .Include(k => k.Owner)
                .Where(k => k.City == city).ToList();

            if (kost != null)
            {
                return kost.Select(kost => new GetKostDto
                {
                    Id = kost.Id,
                    KostName = kost.KostName,
                    KostImage = kost.KostImage!,
                    KostType = kost.KostType,
                    KostPrice = kost.KostPrice,
                    KostAdress = $"{kost.City} {kost.District} {kost.Street}",
                    QtyRoom = kost.QtyRoom,
                }).ToList();
            }
            return null!;
        }

        public ICollection<GetKostDto> GetKostByTypeKost(string typeKost)
        {
            var kost = _context.Kosts
                .Include(k => k.Owner)
                .Where(k => k.KostType == typeKost).ToList();


            if (kost != null)
            {
                return kost.Select(kost => new GetKostDto
                {
                    Id = kost.Id,
                    KostName = kost.KostName,
                    KostImage = kost.KostImage!,
                    KostType = kost.KostType,
                    KostPrice = kost.KostPrice,
                    KostAdress = $"{kost.City} {kost.District} {kost.Street}",
                    QtyRoom = kost.QtyRoom,
                }).ToList();
            }
            return null!;
        }

        public GetKostDto GetKostByKostName(string kostName)
        {
            var kost = _context.Kosts
                .Include(k => k.Owner)
                .Where(k => k.KostName == kostName).FirstOrDefault();

            if (kost != null)
            {
                return new GetKostDto
                {
                    Id = kost.Id,
                    KostName = kost.KostName,
                    KostImage = kost.KostImage!,
                    KostType = kost.KostType,
                    KostPrice = kost.KostPrice,
                    KostAdress = $"{kost.City} {kost.District} {kost.Street}",
                    QtyRoom = kost.QtyRoom,
                };
            }
            return null!;
        }

        public GetDetailKostDto DetailKost(int id)
        {
            var kost = _context.Kosts
               .Include(k => k.Owner)
               .Where(k => k.Id == id).FirstOrDefault();

            var address = $"{kost!.City} {kost.District} {kost.Street}";

            if (kost != null)
            {
                return new GetDetailKostDto
                {
                    IdKost = kost.Id,
                    KostName = kost.KostName,
                    KostImage = kost.KostImage!,
                    KostPrice = kost.KostPrice,
                    KostAdress = address,
                    KostType = kost.KostType,
                    QtyRoom = kost.QtyRoom,
                    PemilikKost = new AccountDto
                    {
                        Email = kost.Owner.Email,
                        Name = kost.Owner.Name,
                        PhoneNumber = kost.Owner.PhoneNumber
                    },
                    Description = kost.Description!,
                    FasilitasKamar = _context.DetailRoomFacilities.Where(rf => rf.Kost.Id == kost.Id)
                                .Select(tf => new RoomFacility { Id = tf.RoomFacility.Id, NamaFasilitas = tf.RoomFacility.NamaFasilitas }).ToList(),
                    FasilitasToilet = _context.DetailToiletFacilities.Where(rf => rf.kost.Id == kost.Id)
                                 .Select(tf => new ToiletFacility { Id = tf.ToiletFacility.Id, NamaFasilitas = tf.ToiletFacility.NamaFasilitas }).ToList(),
                    FasilitasUmum = _context.DetailGeneralFacilities.Where(rf => rf.Kost.Id == kost.Id)
                                 .Select(uf => new GeneralFacility { Id = uf.GeneralFacility.Id, NamaFasilitas = uf.GeneralFacility.NamaFasilitas }).ToList(),
                    Favorits = _context.Favorits.Where(f => f.KostId == kost.Id).ToList(),
                };
            }
            return null!;
        }

        public GetKostDto GetKostById(int id)
        {
            var kost = _context.Kosts
                .Include(k => k.Owner)
                .Where(k => k.Id == id).FirstOrDefault();

            if (kost != null)
            {
                return new GetKostDto
                {
                    Id = kost.Id,
                    KostName = kost.KostName,
                    KostImage = kost.KostImage!,
                    KostType = kost.KostType,
                    KostPrice = kost.KostPrice,
                    KostAdress = $"{kost.City} {kost.District} {kost.Street}",
                    QtyRoom = kost.QtyRoom,
                };
            }
            return null!;
        }
        public bool Deskripsi(DescriptionDto descriptionDto)
        {
            var kost = _context.Kosts
                 .Include(k => k.Owner)
                 .Where(k => k.Id == descriptionDto.idKost).FirstOrDefault();

            if (kost != null)
            {
                kost.Description = descriptionDto.description;
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool Favorit(FavoritDto favoritDto)
        {
            var kost = _context.Kosts
                .Where(k => k.Id == favoritDto.IdKost).FirstOrDefault();

            var favorits = _context.Favorits
                .Where(f => f.KostId == favoritDto.IdKost && f.Email == favoritDto.Email).FirstOrDefault();

            if (kost == null || favorits != null) return false;

            var addFavorit = new Favorit
            {
                Email = favoritDto.Email,
                KostId = favoritDto.IdKost
            };
            _context.Favorits.Add(addFavorit);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteFavorit(FavoritDto favoritDto)
        {
            var favoritToDelete = _context.Favorits
                .Where(f => f.KostId == favoritDto.IdKost && f.Email == favoritDto.Email).FirstOrDefault();

            if (favoritToDelete == null) return false;

            _context.Favorits.Remove(favoritToDelete);
            _context.SaveChanges();
            return true;
        }
    }
}