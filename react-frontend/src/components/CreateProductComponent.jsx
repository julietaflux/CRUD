import React, { Component } from 'react'
import BrandService from '../services/BrandService';
import ProductService from '../services/ProductService';

class CreateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            brands: [],
            id: this.props.match.params.id,
            name: '',
            brand: '',
            cost: '',
            price: ''
        }

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeBrandHandler = this.changeBrandHandler.bind(this);
        this.changeCostHandler = this.changeCostHandler.bind(this);
        this.changeCostHandler = this.changeCostHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        
    }

    componentDidMount(){
        BrandService.getBrands().then( (res) =>{
            let brands = res.data;
            this.setState({
                brands: brands
            })
        })
        
        if(this.state.id === '_add'){
            return
        }else{
            ProductService.getProductById(this.state.id).then( (res) =>{
                let product = res;
                this.setState({
                    name: product.name,
                    brand: product.brand,
                    cost: product.cost,
                    price: product.price
                });
            });  
        }        
    }

    saveOrUpdateProduct = (e) => {
        e.preventDefault();
        let product = {Name: this.state.name, Brand: { Id: '5febbbfb516608d2f0635667', Name: 'Brand 1' }, Cost: Number(this.state.cost), Price: Number(this.state.price)};
        console.log('product => ' + JSON.stringify(product));

        ProductService.createProduct(product).then(res =>{
            this.props.history.push('/products');
        });
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeBrandHandler= (event) => {
        this.setState({brand: event.target.value});
    }

    changeCostHandler= (event) => {
        this.setState({cost: event.target.value});
    }

    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }

    cancel() {
        this.props.history.push('/products');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center my-4">Add Product</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label>Name</label>
                                            <input placeholder="Brand" name="brand" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Brand</label>
                                            <select value={this.state.brand} onChange={this.changeBrandHandler} className="form-control" id="exampleFormControlSelect1">
                                            <option value="" selected disabled>Please select a brand</option>
                                            {this.state.brands.map(
                                                brand => 
                                                <option key={brand.id}>{brand.name}</option>
                                            )}
                                            </select>
                                        </div>
                                        <div className = "form-group">
                                            <label>Cost</label>
                                            <input placeholder="Cost" name="cost" className="form-control" 
                                                value={this.state.cost} onChange={this.changeCostHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Price</label>
                                            <input placeholder="Price" name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changePriceHandler}/>
                                        </div>

                                        <button className="btn btn-primary btn-sm" onClick={this.saveOrUpdateProduct}>Save</button>
                                        <button className="btn btn-secondary btn-sm" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateProductComponent
