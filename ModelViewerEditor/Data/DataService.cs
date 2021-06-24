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

        public IEnumerable<ProjectModel> FindAll()
        {
            var result = _db.GetCollection<ProjectModel>("Project")
                .FindAll();
            return result;
        }

        public ProjectModel FindOne(ObjectId id)
        {
            return _db.GetCollection<ProjectModel>("Project")
                .Find(x => x.Id == id).FirstOrDefault();
        }

        public int Insert(ProjectModel project)
        {
            return _db.GetCollection<ProjectModel>("Project")
                .Insert(project);
        }

        public bool Update(ProjectModel forecast)
        {
            return _db.GetCollection<ProjectModel>("Project")
                .Update(forecast);
        }

        public int Delete(ObjectId id)
        {
            return _db.GetCollection<ProjectModel>("Project")
                .DeleteMany(x => x.Id == id);
        }
    }
}