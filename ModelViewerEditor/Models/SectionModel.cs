using System.Collections.Generic;
using LiteDB;

namespace ModelViewerEditor.Models
{
    public class SectionModel
    {
        public SectionModel()
        {
            Id = ObjectId.NewObjectId();
            Models = new List<ObjectModel>();
        }

        public ObjectId Id {get;set;}
        public string   Name {get;set;}
        public List<ObjectModel>   Models {get;set;}

    }
}