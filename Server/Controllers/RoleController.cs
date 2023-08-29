using Microsoft.AspNetCore.Mvc;
using server.Enums;
using server.Interface;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    { 
        [HttpGet]
        public IActionResult GetRoles()
        {
            List<string> roles = Enum.GetNames(typeof(Role)).ToList();
            return Ok(roles);
        }
    }
}