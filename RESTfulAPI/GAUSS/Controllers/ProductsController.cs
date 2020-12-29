using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GAUSS.Helpers;
using GAUSS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GAUSS.Controllers
{
    public class ProductsController : Controller
    {
        private readonly IMongoHelper _MongoHelper;

        public ProductsController(IMongoHelper mongo)
        {
            _MongoHelper = mongo;
        }
        /*
        /// <summary>
        /// Gets all the Product items.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /Products
        ///
        /// </remarks>
        /// <returns>All the Product items</returns>
        /// <response code="200">Returns all the items</response>
        /// <response code="404">If no item is found</response>      
        [HttpGet]
        [Route("/products")]
        [ProducesResponseType(typeof(List<Product>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            try
            {
                var products = await _MongoHelper.FindAllProducts();

                if (products == null)
                {
                    return NotFound();
                }

                return products;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            } 
        }
       */
        /// <summary>
        /// Gets a Product item.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /Product
        ///     {
        ///         "id": 1,
        ///     }
        ///
        /// </remarks>
        /// <param name="Id"></param>
        /// <returns>A Product item</returns>
        /// <response code="200">Returns the item</response>
        /// <response code="404">If the item is not found</response>      
        [HttpGet]
        [Route("/products/{Id}")]
        [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<Product>>> GetProduct(string Id)
        {
            if (Id == null)
            {
                try
                {
                    var products = await _MongoHelper.FindAllProducts();

                    if (products == null)
                    {
                        return NotFound();
                    }

                    return products;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return BadRequest();
                }
            }

            try
            {
                var product = await _MongoHelper.FindProduct(int.Parse(Id));

                if (product == null)
                {
                    return NotFound();
                }

                return new List<Product> { product };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }

        }

        /// <summary>
        /// Creates a Product item.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Product
        ///     {
        ///         "id": 1,
        ///         "name": "Product Name",
        ///         "brand": {
        ///         "id": 1
        ///         "name": "Brand Name"
        ///         },
        ///         "cost": 1,
        ///         "price": 1
        ///     }
        /// </remarks>
        /// <param name="product"></param>
        /// <returns>A newly created Product item</returns>
        /// <response code="200">Returns the newly created item</response>
        /// <response code="400">If the item could not be added</response>
        [HttpPost]
        [Route("/products")]
        [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Product> PostProduct(Product Product)
        {
            if (Product == null)
            {
                throw new ArgumentNullException(
            $"Product can not be null.");
            }

            try
            {
                _MongoHelper.AddProduct(Product);
                return Product;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }

        }


        /// <summary>
        /// Updates a Product item.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     PATCH /Product
        ///     {
        ///         "name": "Product Name",
        ///         "brand": {
        ///         "id": 1
        ///         "name": "Brand Name"
        ///         },
        ///         "cost": 1,
        ///         "price": 1
        ///     }
        /// </remarks>
        /// <param name="product"></param>
        /// <returns>An updated Product item</returns>
        /// <response code="200">Returns the updated item</response>
        /// <response code="400">If the item could not be updated</response>
        [HttpPatch]
        [Route("/products")]
        [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Product> PatchProduct(Product Product)
        {
            if (Product == null)
            {
                throw new ArgumentNullException(
            $"Product can not be null.");
            }

            try
            {
                _MongoHelper.UpdateProduct(Product);
                return Product;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }

        }

        /// <summary>
        /// Deletes a Product item.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     DELETE /Product
        ///     {
        ///         "id": 1,
        ///         "brand": {
        ///         "id": 1
        ///         "name": "Brand Name"
        ///         },
        ///         "cost": 1,
        ///         "price": 1
        ///     }
        /// </remarks>
        /// <param name="product"></param>
        /// <returns>A deleted Product item</returns>
        /// <response code="200">Returns the deleted item</response>
        /// <response code="404">If the item could not be deleted</response>
        [HttpDelete]
        [Route("/products")]
        [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Product>> DeleteProduct(string Id)
        {
            if (Id == null)
            {
                throw new ArgumentNullException(
            $"Product can not be null.");
            }

            try
            {
                var product = await _MongoHelper.DeleteProduct(int.Parse(Id));
                return product;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return NotFound();
            }
        }
    }
}
