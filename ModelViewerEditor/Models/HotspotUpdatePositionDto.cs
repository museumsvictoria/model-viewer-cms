namespace ModelViewerEditor.Models
{
    public class HotspotUpdatePositionDto : HotspotIdDto
    {
        public string Position { get; set; }
        
        public string Normal { get; set; }

        public string cameraOrbit {get; set;}
    }
}