import React, { Component } from 'react'
import ProductService from '../services/ProductService';

class CreateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
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

    // step 3
    componentDidMount(){

        // step 4
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
        let product = {Name: this.state.name, Brand: {Id: '1', Name: 'QUE NO HAY TE DIJE'}, Cost: Number(this.state.cost), Price: Number(this.state.price)};
        console.log('product => ' + JSON.stringify(product));

        // step 5
        if(this.state.id === '_add'){
            ProductService.createProduct(product).then(res =>{
                this.props.history.push('/products');
            });
        }else{
            ProductService.updateProduct(product).then( res => {
                this.props.history.push('/products');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Product</h3>
        }else{
            return <h3 className="text-center">Update Product</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Name </label>
                                            <input placeholder="Brand" name="brand" className="form-control" 
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

                                        <button className="btn btn-success" onClick={this.saveOrUpdateProduct}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
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
