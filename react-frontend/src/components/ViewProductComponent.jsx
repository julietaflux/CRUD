import React, { Component } from 'react'
import ProductService from '../services/ProductService'

class ViewProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            product: {}
        }
    }

    componentDidMount(){
        ProductService.getProductById(this.state.id).then( res => {
            this.setState({product: res.data[0]});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Product Details</h3>
                    <div className = "card-body">
                    <div className = "row">
                            <label> Id: </label>
                            <div> { this.state.product.id }</div>
                        </div>
                        <div className = "row">
                            <label> Name: </label>
                            <div> { this.state.product.name }</div>
                        </div>
                        <div className = "row">
                            <label> Brand ID: </label>
                            <div> { this.state.product.brand?.id }</div>
                        </div>
                        <div className = "row">
                            <label> Brand Name: </label>
                            <div> { this.state.product.brand?.name }</div>
                        </div>
                        <div className = "row">
                            <label> Cost: </label>
                            <div> { this.state.product.cost }</div>
                        </div>
                        <div className = "row">
                            <label> Price: </label>
                            <div> { this.state.product.price }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewProductComponent
