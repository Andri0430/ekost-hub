using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Enums;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeKostController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetRoles()
        {
            List<string> typeKosts = Enum.GetNames(typeof(TypeKost)).ToList();
            return Ok(typeKosts);
        }
    }
}
