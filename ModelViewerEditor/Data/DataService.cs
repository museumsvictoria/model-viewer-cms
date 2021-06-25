using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using LiteDB;
using ModelViewerEditor.Models;

namespace ModelViewerEditor.Data
{
    public class DataService : IDataService
    {

        private readonly LiteDatabase _db;

        public DataService(IDbContext dbContext)
        {
            _db = dbContext.Database;
        }
        
        private ILiteCollection<ProjectModel> GetProjectCollection()
        {
            return _db.GetCollection<ProjectModel>("Project");
        }

        public IEnumerable<ProjectModel> GetAll()
        {
            var result = GetProjectCollection()
                .FindAll();
            return result;
        }

   

        public ProjectModel Get(ObjectId id)
        {
            return GetProjectCollection().FindById(id);
        }
        
        public ProjectModel FindOne(Expression<Func<ProjectModel, bool>> query)
        {
            return GetProjectCollection()
                .Find(query).FirstOrDefault();
        }
        
       
        
        public IEnumerable<ProjectModel> Find(Expression<Func<ProjectModel, bool>> query)
        {
            return GetProjectCollection()
                .Find(query);
        }

        public bool Exists(Expression<Func<ProjectModel, bool>> query)
        {
            return GetProjectCollection()
                .Exists(query);
        }
        
        public ObjectId Insert(ProjectModel project)
        {
            return GetProjectCollection()
                .Insert(project);
        }

        public bool Update(ProjectModel forecast)
        {
            return GetProjectCollection()
                .Update(forecast);
        }

        public int Delete(ObjectId id)
        {
            return GetProjectCollection()
                .DeleteMany(x => x.Id == id);
        }
    }
}