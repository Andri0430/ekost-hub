using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Dto;
using server.Helpers;
using server.Interface;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacilityController : ControllerBase
    {
        private readonly IFacility _facilityService;
        private readonly EkostContext _context;
        public FacilityController(IFacility facilityService, EkostContext context)
        {
            _facilityService = facilityService;
            _context = context;
        }

        [HttpGet("room-facility")]
        public IActionResult FacilityRooms()
        {
            var facilityRooms = _context.RoomFacilities.ToList();
            return Ok(facilityRooms);
        }
        [HttpGet("toilet-facility")]
        public IActionResult FacilityToilet()
        {
            var facilitytoilet = _context.ToiletFacilities.ToList();
            return Ok(facilitytoilet);
        }
        [HttpGet("general-facility")]
        public IActionResult FacilityGeneral()
        {
            var facilitygeneral = _context.GeneralFacilities.ToList();
            return Ok(facilitygeneral);
        }

        [HttpPost("RoomFacility")]
        public IActionResult AddRoomFacility(FacilityDto roomFacility)
        {
            var addRoomFacility = _facilityService.AddRoomFacility(roomFacility);
            if (addRoomFacility == false) return BadRequest(new {status = 400, message = "Fasilitas Kamar telah Terdaftar"});
            return Ok(new { status = 200, message = "Berhasil Menambahkan Fasilitas Kamar" });
        }

        [HttpPost("ToiletFacility")]
        public IActionResult AddToiletFacility(FacilityDto toiletFacility)
        {
            var addToiletFacility = _facilityService.AddToiletFacility(toiletFacility);
            if (addToiletFacility == false) return BadRequest(new { status = 400, message = "Fasilitas Toilet telah Terdaftar" });
            return Ok(new { status = 200, message = "Berhasil Menambahkan FasilitasToilet" });
        }

        [HttpPost("GeneralFacility")]
        public IActionResult AddGeneralFacility(FacilityDto generalFacility)
        {
            var addTGeneralFacility = _facilityService.AddGeneralFacility(generalFacility);
            if (addTGeneralFacility == false) return BadRequest(new { status = 400, message = "Fasilitas Umum telah Terdaftar" });
            return Ok(new { status = 200, message = "Berhasil Menambahkan Fasilitas Umum" });
        }

        [HttpPut("UpdateRoomFacility")]
        public IActionResult UpdateRoomFacility(UpdateFacilityDto updateFacilityDto)
        {
            var updateRoomFacility = _facilityService.UpdateRoomFacility(updateFacilityDto);
            if (updateRoomFacility == false) return BadRequest("Update Fasilitas Kamar Gagal!!!");
            return Ok("Fasilitas Kamar Berhasil di Update");
        }

        [HttpPut("UpdateToiletFacility")]
        public IActionResult UpdateToiletFacility(UpdateFacilityDto updateFacilityDto)
        {
            var updateToiletFacility = _facilityService.UpdateToiletFacility(updateFacilityDto);
            if (updateToiletFacility == false) return BadRequest("Update Fasilitas Toilet Gagal!!!");
            return Ok("Fasilitas Toilet Berhasil di Update");
        }

        [HttpPut("UpdateGeneralFacility")]
        public IActionResult UpdateGeneralFacility(UpdateFacilityDto updateFacilityDto)
        {
            var updateGeneralFacility = _facilityService.UpdateGeneralFacility(updateFacilityDto);
            if (updateGeneralFacility == false) return BadRequest("Update Fasilitas Umum Gagal!!!");
            return Ok("Fasilitas Umum Berhasil di Update");
        }

        [HttpDelete("DeleteRoomFacility")]
        public IActionResult DeleteRoomFacility(FacilityDto facilityDto)
        {
            var deleteRoomFacility = _facilityService.DeleteRoomFacility(facilityDto);
            if (deleteRoomFacility == false) return BadRequest("Hapus Fasilitas Kamar Gagal");
            return Ok("Fasilitas Kamar Berhasil dihapus");
        }

        [HttpDelete("DeleteToiletFacility")]
        public IActionResult DeleteToiletFacility(FacilityDto facilityDto)
        {
            var deleteToiletFacility = _facilityService.DeleteToiletFacility(facilityDto);
            if (deleteToiletFacility == false) return BadRequest("Hapus Fasilitas Toilet Gagal");
            return Ok("Fasilitas Toilet Berhasil dihapus");
        }

        [HttpDelete("DeleteGeneralFacility")]
        public IActionResult DeleteGeneralFacility(FacilityDto facilityDto)
        {
            var deleteGeneralFacility = _facilityService.DeleteGeneralFacility(facilityDto);
            if (deleteGeneralFacility == false) return BadRequest("Hapus Fasilitas Umum Gagal");
            return Ok("Fasilitas Umum Berhasil dihapus");
        }
    }
}
