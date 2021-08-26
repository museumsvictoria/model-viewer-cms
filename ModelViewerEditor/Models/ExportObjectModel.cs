using System.Collections.Generic;

namespace ModelViewerEditor.Models
{
    public class ExportObjectModel
    {
        #region Constructors

        public ExportObjectModel()
        {
            Hotspots = new List<ExportHotspotModel>();
        }

        #endregion Constructors

        #region Properties

        public string OriginalFileName { get; set; }

        public List<ExportHotspotModel> Hotspots { get; set; }

        public string Name { get; set; }

        #endregion Properties
    }
}