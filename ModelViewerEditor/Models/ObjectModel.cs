using System.Collections.Generic;
using LiteDB;

namespace ModelViewerEditor.Models
{
    public class ObjectModel
    {
        #region Constructors

        public ObjectModel()
        {
            Id = ObjectId.NewObjectId();
            Hotspots = new List<HotspotModel>();
        }

        #endregion Constructors

        #region Properties

        public string OriginalFileName { get; set; }

        public List<HotspotModel> Hotspots { get; set; }

        public ObjectId Id { get; set; }

        public long Length { get; set; }

        public string Name { get; set; }

        #endregion Properties
    }
}