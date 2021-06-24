using System.Collections.Generic;
using LiteDB;
using ModelViewerEditor.Models;

namespace ModelViewerEditor.Data
{
    public interface IDataService
    {
        int Delete(ObjectId id);
        IEnumerable<ProjectModel> FindAll();
        ProjectModel FindOne(ObjectId id);
        int Insert(ProjectModel project);
        bool Update(ProjectModel project);
    }
}