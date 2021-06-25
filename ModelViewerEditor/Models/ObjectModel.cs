using System.Collections.Generic;
using LiteDB;

namespace ModelViewerEditor.Models
{
    public class ObjectModel
    {
        public ObjectModel()
        {
            Id = ObjectId.NewObjectId();
            Hotspots = new List<HotspotModel>();
        }

        public ObjectId    Id{get;set;}
        public string    Name{get;set;}
        public string   FileName{get;set;}
        public List<HotspotModel>   Hotspots {get;set;}
    }
}