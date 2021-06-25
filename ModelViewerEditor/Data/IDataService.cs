using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using LiteDB;
using ModelViewerEditor.Models;

namespace ModelViewerEditor.Data
{
    public interface IDataService
    {
        int Delete(ObjectId id);
        IEnumerable<ProjectModel> GetAll();
        ProjectModel Get(ObjectId id);
        ObjectId Insert(ProjectModel project);
        bool Update(ProjectModel project);
        bool Exists(Expression<Func<ProjectModel, bool>> query);
    }
}