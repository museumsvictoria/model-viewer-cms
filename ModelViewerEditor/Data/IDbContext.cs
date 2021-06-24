using LiteDB;

namespace ModelViewerEditor.Data
{
    public interface IDbContext
    {
        LiteDatabase Database { get; }
    }
}