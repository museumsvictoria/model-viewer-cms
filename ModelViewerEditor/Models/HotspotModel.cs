using LiteDB;

namespace ModelViewerEditor.Models
{
    public class HotspotModel
    {
        public ObjectId Id {get;set;}
        public string Text {get;set;}
        public string  DataPosition {get;set;}
        public string  DataNormal {get;set;}
        public string  CameraOrbit {get;set;}
        public string  FieldOfView {get;set;}
    }
}