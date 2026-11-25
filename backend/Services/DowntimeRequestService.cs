
using backend.Models;

namespace backend.Services
{
    public class DowntimeRequestService
    {
        private readonly List<DowntimeRequest> _requests = new();

        public List<DowntimeRequest> GetAll()
        {
            return _requests;
        }

        public DowntimeRequest? GetById(int id)
        {
            return _requests.FirstOrDefault(r => r.Id == id);
        }

        public DowntimeRequest Create(DowntimeRequest request)
        {
            request.Id = _requests.Count == 0
                ? 1
                : _requests.Max(r => r.Id) + 1;

            request.Number = $"З-{request.Id:D4}";
            request.CreatedAt = DateTime.UtcNow;
            request.Status = "New";

            _requests.Add(request);

            return request;
        }

        public DowntimeRequest? Assign(int id, int assigneeId)
        {
            var request = GetById(id);

            if (request == null)
                return null;

            request.AssigneeId = assigneeId;

            return request;
        }

        public DowntimeRequest? UpdateStatus(int id, string status)
        {
            var request = GetById(id);

            if (request == null)
                return null;

            request.Status = status;

            return request;
        }
    }
}
