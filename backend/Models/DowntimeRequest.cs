
namespace backend.Models
{
    public class DowntimeRequest
    {
        public int Id { get; set; }

        public string Number { get; set; } = string.Empty;

        public int PumpId { get; set; }

        public string Description { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public string Status { get; set; } = "New";

        public int? AssigneeId { get; set; }
    }
}
