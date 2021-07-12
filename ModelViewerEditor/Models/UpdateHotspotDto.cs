namespace ModelViewerEditor.Models
{
    public class UpdateHotspotDto
    {
        public string ProjectId { get; set; }
        public string SectionId { get; set; }
        
        public string ModelId { get; set; }
        
        public string HotspotId { get; set; }
        
        public string Text {get;set;}
        public string  DataPosition {get;set;}
        public string  DataNormal {get;set;}
        public string  CameraOrbit {get;set;}
        public string  FieldOfView {get;set;}

    }
}