
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("info")]
    public class InfoController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new
            {
                name = "Система учёта заявок на устранение простоев насосного оборудования",
                version = "1.0.0",
                description = "API для учёта и обработки заявок на устранение простоев насосного оборудования."
            });
        }
    }
}
