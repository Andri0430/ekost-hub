using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dto;
using server.Interface;
using server.Models;

namespace server.Repository
{
    public class FacilityRepo : IFacility
    {
        private readonly EkostContext _context;
        public FacilityRepo(EkostContext context)
        {
            _context = context;
        }

        public Kost GetDetailKostById(int id)
        {
            var kost = _context.Kosts
                .Include(k => k.Owner)
                .Where(k => k.Id == id).FirstOrDefault();

            return kost!;
        }

        public bool AddGeneralFacility(FacilityDto facilityDto)
        {
            var kostDetailId = GetDetailKostById(facilityDto.IdKost);
            var generalFacility = _context.GeneralFacilities
                             .Where(gf => gf.Id == facilityDto.IdFasilitas).FirstOrDefault();

            var detailGeneralFacility = _context.DetailGeneralFacilities
                .Where(gf => gf.GeneralFacility.Id == facilityDto.IdFasilitas && gf.Kost.Id == facilityDto.IdKost).FirstOrDefault();

            if (kostDetailId == null || generalFacility == null || detailGeneralFacility != null) return false;

            var addDetailGeneralFacility = new DetailGeneralFacility
            {
                Kost = kostDetailId,
                GeneralFacility = _context.GeneralFacilities.Where(gf => gf.Id == facilityDto.IdFasilitas).FirstOrDefault()!,
            };
            _context.DetailGeneralFacilities.Add(addDetailGeneralFacility);
            _context.SaveChanges();
            return true;
        }

        public bool AddRoomFacility(FacilityDto facilityDto)
        {
            var kostDetailId = GetDetailKostById(facilityDto.IdKost);

            var roomFacility = _context.RoomFacilities
                              .Where(rf => rf.Id == facilityDto.IdFasilitas).FirstOrDefault();

            var detailRoomFacility = _context.DetailRoomFacilities
                              .Where(rf => rf.RoomFacility.Id == facilityDto.IdFasilitas && rf.Kost.Id == facilityDto.IdKost).FirstOrDefault();

            if (kostDetailId == null || roomFacility == null || detailRoomFacility != null) return false;

            var addDetailFacilityRoom = new DetailRoomFacility
            {
                Kost = kostDetailId,
                RoomFacility = _context.RoomFacilities.Where(rf => rf.Id == facilityDto.IdFasilitas).FirstOrDefault()!,
            };
            _context.DetailRoomFacilities.Add(addDetailFacilityRoom);
            _context.SaveChanges();
            return true;
        }

        public bool AddToiletFacility(FacilityDto facilityDto)
        {
            var kostDetailId = GetDetailKostById(facilityDto.IdKost);
            var toiletFacility = _context.ToiletFacilities
                             .Where(gf => gf.Id == facilityDto.IdFasilitas).FirstOrDefault();

            var detailFacToiletility = _context.DetailToiletFacilities
                             .Where(tf => tf.ToiletFacility.Id == facilityDto.IdFasilitas && tf.kost.Id == facilityDto.IdKost).FirstOrDefault();

            if (kostDetailId == null || toiletFacility == null || detailFacToiletility != null) return false;

            var addDetailToilerFacility = new DetailToiletFacility
            {
                kost = kostDetailId,
                ToiletFacility = _context.ToiletFacilities.Where(tf => tf.Id == facilityDto.IdFasilitas).FirstOrDefault()!,
            };
            _context.DetailToiletFacilities.Add(addDetailToilerFacility);
            _context.SaveChanges();
            return true;
        }

        public bool UpdateRoomFacility(UpdateFacilityDto updateFacilityDto)
        {
            var kostDetailId = GetDetailKostById(updateFacilityDto.IdKost);
            var roomFacilityToUpdate = _context.DetailRoomFacilities
                .Where(rf => rf.RoomFacility.Id == updateFacilityDto.IdFasilitasLama && rf.Kost.Id == updateFacilityDto.IdKost).FirstOrDefault()!;

            if (kostDetailId == null || roomFacilityToUpdate == null) return false;

            roomFacilityToUpdate!.RoomFacility = _context.RoomFacilities.Where(rf => rf.Id == updateFacilityDto.IdFasilitasBaru).FirstOrDefault()!;
            _context.SaveChanges();
            return true;
        }

        public bool UpdateToiletFacility(UpdateFacilityDto updateFacilityDto)
        {
            var kostDetailId = GetDetailKostById(updateFacilityDto.IdKost);
            var toiletFacilityToUpdate = _context.DetailToiletFacilities
                .Where(rf => rf.ToiletFacility.Id == updateFacilityDto.IdFasilitasLama && rf.kost.Id == updateFacilityDto.IdKost).FirstOrDefault()!;

            if (kostDetailId == null || toiletFacilityToUpdate == null) return false;

            toiletFacilityToUpdate!.ToiletFacility = _context.ToiletFacilities.Where(rf => rf.Id == updateFacilityDto.IdFasilitasBaru).FirstOrDefault()!;
            _context.SaveChanges();
            return true;
        }

        public bool UpdateGeneralFacility(UpdateFacilityDto updateFacilityDto)
        {
            var kostDetailId = GetDetailKostById(updateFacilityDto.IdKost);
            var generalFacilityToUpdate = _context.DetailGeneralFacilities
                .Where(rf => rf.GeneralFacility.Id == updateFacilityDto.IdFasilitasLama && rf.Kost.Id == updateFacilityDto.IdKost).FirstOrDefault()!;

            if (kostDetailId == null || generalFacilityToUpdate == null) return false;

            generalFacilityToUpdate!.GeneralFacility = _context.GeneralFacilities.Where(rf => rf.Id == updateFacilityDto.IdFasilitasBaru).FirstOrDefault()!;
            _context.SaveChanges();
            return true;
        }

        public bool DeleteRoomFacility(FacilityDto facilityDto)
        {
            var kostDetailId = GetDetailKostById(facilityDto.IdKost);
            var roomFacilityToDelete = _context.DetailRoomFacilities
                .Where(rf => rf.RoomFacility.Id == facilityDto.IdFasilitas && rf.Kost.Id == facilityDto.IdKost).FirstOrDefault();

            if (kostDetailId == null || roomFacilityToDelete == null) return false;

            _context.DetailRoomFacilities.Remove(roomFacilityToDelete);
            _context.SaveChanges();

            return true;
        }

        public bool DeleteToiletFacility(FacilityDto facilityDto)
        {
            var kostDetailId = GetDetailKostById(facilityDto.IdKost);
            var toiletFacilityToDelete = _context.DetailToiletFacilities
                 .Where(rf => rf.ToiletFacility.Id == facilityDto.IdFasilitas && rf.kost.Id == facilityDto.IdKost).FirstOrDefault();

            if (kostDetailId == null || toiletFacilityToDelete == null) return false;

            _context.DetailToiletFacilities.Remove(toiletFacilityToDelete);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteGeneralFacility(FacilityDto facilityDto)
        {
            var kostDetailId = GetDetailKostById(facilityDto.IdKost);
            var generalFacilityToDelete = _context.DetailGeneralFacilities
                .Where(rf => rf.GeneralFacility.Id == facilityDto.IdFasilitas && rf.Kost.Id == facilityDto.IdKost).FirstOrDefault();

            if (kostDetailId == null || generalFacilityToDelete == null) return false;

            _context.DetailGeneralFacilities.Remove(generalFacilityToDelete);
            _context.SaveChanges();
            return true;
        }
    }
}
