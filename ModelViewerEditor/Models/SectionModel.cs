using System.Collections.Generic;

namespace ModelViewerEditor.Models
{
    public class SectionModel
    {
        public string Id {get;set;}
        public string   Name {get;set;}
        public List<ObjectModel>   Models {get;set;}

    }
}