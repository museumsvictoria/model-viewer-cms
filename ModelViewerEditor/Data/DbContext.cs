using LiteDB;
using Microsoft.Extensions.Options;

namespace ModelViewerEditor.Data
{
    public class DbContext : IDbContext
    {
        public LiteDatabase Database { get; }

        public DbContext(IOptions<AppSettings> settings)
        {
            Database = new LiteDatabase(settings.Value.ConnectionString);
        }
    }
}