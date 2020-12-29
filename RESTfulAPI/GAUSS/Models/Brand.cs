using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;

namespace GAUSS.Models
{
    public class Brand
    {
        [Required]
        [BsonId]
        public string Id { get; set; }

        [Required]
        [BsonElement("Name")]
        public string Name { get; set; }
    }
}
