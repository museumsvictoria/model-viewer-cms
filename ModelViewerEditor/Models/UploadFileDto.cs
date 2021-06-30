using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace ModelViewerEditor.Models
{
    public class UploadFileDto
    {
        public string ProjectId { get; set; }
        public string SectionId { get; set; }
        public string ModelId { get; set; }
        public FormFile File { get; set; }
    }
}