using GAUSS.Controllers;
using GAUSS.Helpers;
using Xunit;
using Moq;
using GAUSS.Models;
using System;
using System.Threading.Tasks;

namespace GAUSS.Tests
{
    public class APIActionsTests
    {
        public ProductsController _productsController;
        public Mock<IMongoHelper> _moqMongoProvider;

        /*
        [Fact]
        public void Get_Products_Calls_FindAllProducts_Method()
        {
            // Arrange
            _moqMongoProvider = new Mock<IMongoHelper>();
            _productsController = new ProductsController(_moqMongoProvider.Object);

            // Act
            var res = _productsController.GetProducts();

            _moqMongoProvider.Verify(m => m.FindAllProducts(), Times.Exactly(1));
        }
        */
        [Fact]
        public void Get_Product_Calls_FindProduct_Method()
        {
            // Arrange
            _moqMongoProvider = new Mock<IMongoHelper>();
            _productsController = new ProductsController(_moqMongoProvider.Object);

            // Act
            var res = _productsController.GetProduct("1");

            _moqMongoProvider.Verify(m => m.FindProduct(It.IsAny<int>()), Times.Exactly(1));
        }
        /*
        [Fact]
        public async Task Get_Product_Null_Argument_Throws_Null_Exception_Async()
        {
            // Arrange
            _moqMongoProvider = new Mock<IMongoHelper>();
            _productsController = new ProductsController(_moqMongoProvider.Object);

            // Act
            Func<Task> action = async () =>
                 await _productsController.GetProduct(null);

            // Assert
            var ex = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Contains("Value cannot be null. (Parameter 'Id can not be null.')", ex.Message);
        }
        */
        [Fact]
        public void Post_Product_Calls_AddProduct_Method()
        {
            // Arrange
            _moqMongoProvider = new Mock<IMongoHelper>();
            _productsController = new ProductsController(_moqMongoProvider.Object);

            Product prod = new Product()
            {
                Id = "1",
                Name = "A name",
                Brand = new Brand(),
                Cost = 1,
                Price = 2
            };

            // Act
            var res = _productsController.PostProduct(prod);

            // Assert
            _moqMongoProvider.Verify(m => m.AddProduct(prod), Times.Exactly(1));
        }

        [Fact]
        public void Post_Product_Null_Argument_Throws_Argument_Null_Exception()
        {
            // Arrange
            _moqMongoProvider = new Mock<IMongoHelper>();
            _productsController = new ProductsController(_moqMongoProvider.Object);

            // Assert
            Assert.Throws<ArgumentNullException>(() => _productsController.PostProduct(null));
        }

        [Fact]
        public void Patch_Product_Calls_UpdateProduct_Method()
        {
            // Arrange
            _moqMongoProvider = new Mock<IMongoHelper>();
            _productsController = new ProductsController(_moqMongoProvider.Object);

            Product prod = new Product()
            {
                Id = "1",
                Name = "A name",
                Brand = new Brand(),
                Cost = 1,
                Price = 2
            };

            // Act
            var res = _productsController.PatchProduct(prod);

            // Assert
            _moqMongoProvider.Verify(m => m.UpdateProduct(prod), Times.Exactly(1));
        }

        [Fact]
        public void Patch_Product_Null_Argument_Throws_Argument_Null_Exception()
        {
            // Arrange
            _moqMongoProvider = new Mock<IMongoHelper>();
            _productsController = new ProductsController(_moqMongoProvider.Object);

            // Assert
            Assert.Throws<ArgumentNullException>(() => _productsController.PatchProduct(null));
        }

        [Fact]
        public void Delete_Product_Calls_DeleteProduct_Method()
        {
            // Arrange
            _moqMongoProvider = new Mock<IMongoHelper>();
            _productsController = new ProductsController(_moqMongoProvider.Object);

            Product prod = new Product()
            {
                Id = "1",
                Name = "A name",
                Brand = new Brand(),
                Cost = 1,
                Price = 2
            };

            // Act
            var res = _productsController.DeleteProduct(prod.Id);

            // Assert
            _moqMongoProvider.Verify(m => m.DeleteProduct(int.Parse(prod.Id)), Times.Exactly(1));
        }

        [Fact]
        public async Task Delete_Product_Null_Argument_Throws_Null_Exception_Async()
        {
            // Arrange
            _moqMongoProvider = new Mock<IMongoHelper>();
            _productsController = new ProductsController(_moqMongoProvider.Object);

            // Act
            Func<Task> action = async () =>
                 await _productsController.DeleteProduct(null);

            // Assert
            var ex = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Contains("Value cannot be null. (Parameter 'Product can not be null.')", ex.Message);
        }
    }
}
