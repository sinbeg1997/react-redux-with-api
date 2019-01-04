import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from '../../actions/index'
import { connect } from 'react-redux'
class ProductActionPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: false
        }
    }

    componentDidMount(){
        var { match } = this.props
        if(match){
            var id = match.params.id
            this.props.onEditProduct(id)
        }
    }

    componentWillReceiveProps(nextProps) {
       if (nextProps && nextProps.itemEditing){
           const {itemEditing} = nextProps
           this.setState({
               id: itemEditing.id,
               txtName: itemEditing.name,
               txtPrice: itemEditing.price,
               chkbStatus: itemEditing.status
           })
       }
    }
    onChange = (e) => {
        var target = e.target
        var name = target.name
        var value = target.type === 'checkbox' ? target.checked : target.value
        this.setState({
            [name]: value
        })
    }
    onSave = (e) => {
        e.preventDefault()
        const {txtName, txtPrice, chkbStatus, id} = this.state
        const {history} = this.props
        const product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: chkbStatus
        }
        if (id){
            // update
            this.props.onUpdateProduct(product)
        } else{
            this.props.onAddProduct(product)
        }
        history.push('/product-list')
    }
    render() {
        const {txtName, txtPrice, chkbStatus} = this.state
        return (
           <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">         
           <form onSubmit={this.onSave}>          
               <div className="form-group">
                   <label >Tên sản phẩm:</label>
                   <input 
                        type="text" 
                        className="form-control" 
                        name='txtName'
                        value={txtName}
                        onChange={this.onChange}
                    />
               </div>
               <div className="form-group">
                   <label >Giá:</label>
                   <input 
                        type="number" 
                        className="form-control" 
                        name='txtPrice'
                        value={txtPrice}
                        onChange={this.onChange}
                    />
               </div>
               <div className="form-group">
                   <label >Trạng thái:</label> 
                    <div className="checkbox">
                        <label>
                            <input 
                                type="checkbox" 
                                name='chkbStatus'
                                checked={chkbStatus}
                                value={chkbStatus}
                                onChange={this.onChange}
                            />
                            Còn hàng
                        </label>
                    </div>    
               </div>
               <button type="submit" className="btn btn-primary mr-10"><i className="fas fa-save"></i> Lưu lại</button>
               <Link to='/product-list' className='btn btn-danger' ><i className="fas fa-arrow-circle-left"></i> Trở lại</Link>
           </form>
           </div>
           
        )
    }
}

const mapStateToProps = state => {
    return {
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProduct: (product) => {
            dispatch(actAddProductRequest(product))
        },
        onEditProduct: (id) => {
            dispatch(actGetProductRequest(id))
        },
        onUpdateProduct: (product) => {
            dispatch(actUpdateProductRequest(product))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage)
