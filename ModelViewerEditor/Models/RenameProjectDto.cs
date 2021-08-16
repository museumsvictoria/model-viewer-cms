namespace ModelViewerEditor.Models
{
    public class RenameProjectDto
    {
        public string Id { get; set; }
        public string Name { get; set; }

    }

    public class RenameSectionDto
    {
        public string ProjectId { get; set; }
        public string SectionId { get; set; }

        public string Name { get; set; }

    }
}