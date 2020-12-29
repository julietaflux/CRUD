using System;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GAUSS.Models
{
    public class Product
    {
        [Required]
        [BsonId]
        public string Id { get; set; }

        [Required]
        [BsonElement("Name")]
        public string Name { get; set; }

        [Required]
        [BsonElement("Brand")]
        public Brand Brand { get; set; }

        [Required]
        [BsonElement("Cost")]
        public int Cost { get; set; }

        [Required]
        [BsonElement("Price")]
        public int Price { get; set; }

        public void Returns(Product prod)
        {
            throw new NotImplementedException();
        }
    }
}
