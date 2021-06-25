using System.Collections.Generic;
using LiteDB;

namespace ModelViewerEditor.Models
{
    public class ProjectModel
    {
        public ProjectModel( )
        {
            Sections = new List<SectionModel>();
        }

        public ObjectId Id {get;set;}
        public string Name {get;set;}
        public List<SectionModel>   Sections {get;set;}

    }
    
}