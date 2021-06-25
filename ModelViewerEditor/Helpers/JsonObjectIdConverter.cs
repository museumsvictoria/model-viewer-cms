using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using LiteDB;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace ModelViewerEditor.Helpers
{
    public class JsonObjectIdConverter:JsonConverter<ObjectId>
    {

        public override ObjectId Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) => new ObjectId(JsonSerializer.Deserialize<string>(ref reader, options));
        
        public override void Write(Utf8JsonWriter writer, ObjectId value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString());
        }
    }
}