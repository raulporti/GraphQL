import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/animated';
import Resumen from './Resumen';
import GenerarPedido from './GenerarPedido';
import Error from '../Alertas/Error';
class ContenidoPedido extends Component {
    state = { 
        productos: [],
        total: 0
     }

    seleccionarProducto = (productos)=>{
        this.setState({
         productos   
        })
    }
    actualizarTotal =() =>{
        let nuevoTotal = 0;
        const productos = this.state.productos;
        if(productos.length === 0){
            this.setState({
                total: nuevoTotal
            });
            return;
        }
        
       
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));
        this.setState({
            total: nuevoTotal
        });
       
    }
    actualizarCantidad = (cantidad, index) => {
        const productos = this.state.productos;
        productos[index].cantidad = Number(cantidad);
        this.setState({
            productos
        },() =>{
            this.actualizarTotal();
        })
    }

    eliminarProducto = (id) => {
        const productos = this.state.productos;
        const productoRestante = productos.filter(producto => producto.id !== id);
        
        this.setState({
            productos: productoRestante
        },() =>{
            this.actualizarTotal();
        })
    }
    render() { 
        const mensaje = ( this.state.total < 0) ? <Error error="Las cantidades no pueden ser negativas"/> : '';
        return ( 
            <Fragment>
            <h2 className="text-center mb-5">Seleccionar Articulos</h2>
            {mensaje}
            <Select options={this.props.productos}
            onChange={this.seleccionarProducto}
            isMulti={true}
            components={Animated()} 
            placeholder="Seleccionar Productos"
            getOptionValue={(options)=>options.id}
            getOptionLabel={(options)=>options.nombre}
            value={this.state.productos}/>
            <Resumen
              productos = {this.state.productos}  
              actualizarCantidad = {this.actualizarCantidad}
              eliminarProducto = {this.eliminarProducto}
            />
            <p className="font-weight-bold float-right mt-4">
                Total:
                <span className="font-wight-normal">
                    $ {this.state.total}
                </span>
            </p>
            <GenerarPedido
                productos = {this.state.productos}
                total = {this.state.total}
                idCliente = {this.props.id}
            />
            </Fragment>
         );
    }
}
 
export default ContenidoPedido;