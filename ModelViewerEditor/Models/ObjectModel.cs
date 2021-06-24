using System.Collections.Generic;

namespace ModelViewerEditor.Models
{
    public class ObjectModel
    {
        public string    Id{get;set;}
        public string    Name{get;set;}
        public string   FileName{get;set;}
        public List<HotspotModel>   Hotspots {get;set;}
    }
}