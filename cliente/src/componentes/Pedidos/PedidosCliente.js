import React, {Fragment} from 'react';
import {Query} from 'react-apollo';
import {OBTENER_PEDIDOS} from '../../queries';
import '../../spinner.css';
import Pedido from './Pedido';
const PedidosCliente = (props) => {
    console.log(props);
    const cliente = props.match.params.id;
    console.log(cliente);
    return (
        <Fragment>
            <h1 className="text-center mb-5">Pedidos del Cliente</h1>
            <div className="row">
                <Query query={OBTENER_PEDIDOS} pollInterval={500} variables={{cliente}}>
                    {({loading, error,data, startPolling, stopPolling})=>{
                if(loading) return (
                    <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                  </div>  
               );
                if(error) return `Error: ${error.message}`;
                return(
                        data.obtenerPedidos.map(pedido =>(
                            <Pedido
                                key={pedido.id}
                                pedido={pedido}
                                cliente= {cliente}
                            />
                        ))
                );
                    }}
                </Query>
            </div>
            
        </Fragment>        
     );
}
 
export default PedidosCliente;