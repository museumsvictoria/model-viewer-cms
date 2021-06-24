using System.Collections.Generic;
using LiteDB;

namespace ModelViewerEditor.Models
{
    public class ProjectModel
    {
        public ObjectId Id {get;set;}
        public string   Text {get;set;}
        public List<SectionModel>   Sections {get;set;}

    }
    
}