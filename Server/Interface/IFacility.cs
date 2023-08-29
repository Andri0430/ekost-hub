using server.Dto;
using server.Models;

namespace server.Interface
{
    public interface IFacility
    {
        Kost GetDetailKostById(int id);
        bool AddRoomFacility(FacilityDto facilityDto);
        bool AddToiletFacility(FacilityDto facilityDto);
        bool AddGeneralFacility(FacilityDto facilityDto);
        bool UpdateRoomFacility(UpdateFacilityDto updateFacilityDto);
        bool UpdateToiletFacility(UpdateFacilityDto updateFacilityDto);
        bool UpdateGeneralFacility(UpdateFacilityDto updateFacilityDto);
        bool DeleteRoomFacility(FacilityDto facilityDto);
        bool DeleteToiletFacility(FacilityDto facilityDto);
        bool DeleteGeneralFacility(FacilityDto facilityDto);
    }
}
