
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/downtime-requests")]
    public class DowntimeRequestsController : ControllerBase
    {
        private readonly DowntimeRequestService _service;

        public DowntimeRequestsController(DowntimeRequestService service)
        {
            _service = service;
        }

        // Получение всех заявок
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAll());
        }

        // Получение заявки по ID
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var request = _service.GetById(id);

            if (request == null)
                return NotFound();

            return Ok(request);
        }

        // Создание новой заявки
        [HttpPost]
        public IActionResult Create(DowntimeRequest request)
        {
            var createdRequest = _service.Create(request);

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdRequest.Id },
                createdRequest
            );
        }

                // Назначение исполнителя
        [HttpPatch("{id}/assignee")]
        public IActionResult Assign(int id, [FromBody] int assigneeId)
        {
            var request = _service.Assign(id, assigneeId);

            if (request == null)
                return NotFound();

            return Ok(request);
        }

        // Изменение статуса
        [HttpPatch("{id}/status")]
        public IActionResult UpdateStatus(int id, [FromBody] string status)
        {
            var request = _service.UpdateStatus(id, status);

            if (request == null)
                return NotFound();

            return Ok(request);
        }
    }
}
