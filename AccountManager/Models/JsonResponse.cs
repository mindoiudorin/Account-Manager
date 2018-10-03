using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AccountManager.Models
{
    public class JsonResponse
    {
        public JsonResponse()
        {
            Status = JsonActionStatus.Failed;
            Message = string.Empty;
            InnerErrorMessage = string.Empty;
        }

        public JsonActionStatus Status { get; set; }
        public string Message { get; set; }
        public string InnerErrorMessage { get; set; }
    }

    public enum JsonActionStatus
    {
        Failed = 0,
        Success = 1,
        AccessDenied = 2,
        ExpiredSession = 3
    }
}