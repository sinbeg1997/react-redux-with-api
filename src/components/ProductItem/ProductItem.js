import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import numeral from 'numeral'

export default class ProductItem extends Component {
    onDelete = (id) => {
        if (confirm('Bạn chắc chắn muốn xóa hay không')){ //eslint-disable-line
           this.props.onDelete(id)
        }
    }
    render() {
        const {product, index} = this.props
        var statusName = product.status ? 'Còn hàng' : 'Hết hàng'
        var statusClass = product.status ? 'warning' : 'default'
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{numeral(product.price).format('0,0')} VND</td>
                <td>
                    <span className={`label label-${statusClass}`}>{statusName}</span>
                </td>
                <td>
                    <Link 
                        to={`/product/${product.id}/edit`} 
                        className="btn btn-success mr-10"
                    ><i className="far fa-edit"></i> Sửa
                    </Link>
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={() => this.onDelete(product.id)}
                    >
                    <i className="far fa-trash-alt"></i> Xóa</button>
                </td>
            </tr>
        )
    }
}
