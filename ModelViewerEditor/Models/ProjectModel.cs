using System.Collections.Generic;

namespace ModelViewerEditor.Models
{
    public class ProjectModel
    {
        public string Id {get;set;}
        public string   Text {get;set;}
        public List<SectionModel>   Sections {get;set;}

    }
}