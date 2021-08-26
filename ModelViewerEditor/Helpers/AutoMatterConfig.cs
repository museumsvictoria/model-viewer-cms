using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ModelViewerEditor.Models;

namespace ModelViewerEditor.Helpers
{
    public class AutoMappingConfiguration : Profile
    {
        public AutoMappingConfiguration()
        {

            CreateMap<ObjectModel, ExportObjectModel>();
            CreateMap<HotspotModel, ExportHotspotModel>();


            //CreateMap<Story, StoryViewModel>()
            //    .ForMember(x => x.Banner, opt => opt.Ignore())
            //    .ForMember(x => x.EducationResources, opt => opt.Ignore());

            //CreateMap<ExhibitionSection, StorySectionViewModel>()
            //    .ForMember(x => x.Banner, opt => opt.Ignore());


            //CreateMap<ExhibitionItem, StoryItemViewModel>()
            //    .ForMember(x => x.Media, opt => opt.Ignore());


            //CreateMap<Story, StorySummaryViewModel>()
            //    .ForMember(x => x.Banner, opt => opt.Ignore());

            ////CreateMap<ExhibitionSection, ExhibitionSectionSummaryViewModel>()
            ////    .ForMember(x => x.Banner, opt => opt.Ignore());


            //CreateMap<Place, PlaceViewModel>();

            //CreateMap<WebLink, HyperlinkView>();

            //CreateMap<WebLink, WebLinkView>();

            //CreateMap<Pages.Contact.ApplyToJoin.ApplicationToJoinModel, Application>()
            //    .ForMember(x => x.OrganisationId, opt => opt.Ignore())
            //    .ForMember(x => x.ApplicantId, opt => opt.Ignore())
            //    .ForMember(x => x.Processed, opt => opt.Ignore())
            //    .ForMember(x => x.ProcessedBy, opt => opt.Ignore())
            //    .ForMember(x => x.ProcessedDateTime, opt => opt.Ignore());

        }
    }


}
