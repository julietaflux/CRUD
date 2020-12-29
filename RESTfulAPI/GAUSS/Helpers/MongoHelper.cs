using System.Collections.Generic;
using GAUSS.Models;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Linq;

namespace GAUSS.Helpers
{
    public class MongoHelper : IMongoHelper
    {
        private static IMongoDatabase _db; 
        public static IMongoCollection<Product> collection;
        private static MongoClient _client;

        public MongoHelper()
        {
            var mongoUri = "mongodb+srv://testingdb:testing1121@cluster0.e7hvi.mongodb.net/test";
            _client = new MongoClient(mongoUri);
            _db = _client.GetDatabase("products");
            collection = _db.GetCollection<Product>("products");
        }

        public async Task<List<Product>> FindAllProducts()
        {
            var productsCursor = await collection.FindAsync(_ => true);
            var products = productsCursor.ToList();
            return products;
        }

        public async Task<Product> FindProduct(int Id)
        {
            var productCursor = await collection.FindAsync(Builders<Product>.Filter.Eq("Id", Id));
            var product = productCursor.ToList().First();
            return product;
        }

        public async void AddProduct(Product product)
        {
            await collection.InsertOneAsync(product);
        }

        public async void UpdateProduct(Product product)
        {
            var update = Builders<Product>.Update
                    .Set("Name", product.Name)
                    .Set("Brand", product.Brand)
                    .Set("Cost", product.Cost)
                    .Set("Price", product.Price);

            await collection.UpdateOneAsync(Builders<Product>.Filter.Eq("Id", product.Id), update);

        }

        public async Task<Product> DeleteProduct(int id)
        {
            var productCursor = await collection.FindAsync(Builders<Product>.Filter.Eq("Id", id));
            var product = productCursor.ToList().First();

            await collection.DeleteOneAsync(Builders<Product>.Filter.Eq("Id", id));

            return product;
        }
    }
}
