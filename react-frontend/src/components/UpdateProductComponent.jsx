import React, { Component } from 'react'
import ProductService from '../services/ProductService';

class UpdateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            brand: '',
            cost: '',
            price: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeBrandHandler = this.changeBrandHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeCostHandler = this.changeCostHandler.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
    }

    componentDidMount(){
        ProductService.getProductById(this.state.id).then( (res) =>{
            let product = res;
            this.setState({

                id: this.props.match.params.id,
                name: product.name,
                brand: product.brand,
                cost: product.cost,
                price : product.price
            });
        });
    }

    updateProduct = (e) => {
        e.preventDefault();
        let product = {Id: this.state.id, Name: this.state.name, Brand: {Id: '5febbbfb516608d2f0635667', Name: 'Brand 1'}, Cost: Number(this.state.cost), Price: Number(this.state.price)};
        console.log('product => ' + JSON.stringify(product));

        ProductService.updateProduct(product).then(res =>{
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

    cancel(){
        this.props.history.push('/products');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center py-4">Update Product</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Name </label>
                                            <input placeholder="Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Brand </label>
                                            <input placeholder="Brand" name="brand" className="form-control" 
                                                value={this.state.brand} onChange={this.changeBrandHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Cost </label>
                                            <input placeholder="Cost" name="cost" className="form-control" 
                                                value={this.state.cost} onChange={this.changeCostHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Price </label>
                                            <input placeholder="Price" name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changePriceHandler}/>
                                        </div>

                                        <button className="btn btn-primary btn-sm" onClick={this.updateProduct}>Save</button>
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

export default UpdateProductComponent
