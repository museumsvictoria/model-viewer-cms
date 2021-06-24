using System.Collections.Generic;
using System.Linq;
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

        public IEnumerable<ProjectModel> FindAll()
        {
            var result = GetProjectCollection()
                .FindAll();
            return result;
        }

   

        public ProjectModel FindOne(ObjectId id)
        {
            return GetProjectCollection()
                .Find(x => x.Id == id).FirstOrDefault();
        }

        public int Insert(ProjectModel project)
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