using System.Collections.Generic;
using System.Threading.Tasks;
using GAUSS.Models;

namespace GAUSS.Helpers
{
    public interface IMongoHelper
    {
        public Task<List<Product>> FindAllProducts();
        public Task<Product> FindProduct(int Id);
        public void AddProduct(Product product);
        public void UpdateProduct(Product product);
        public Task<Product> DeleteProduct(int id);
    }
}