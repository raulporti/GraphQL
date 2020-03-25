import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import {OBTENER_PRODUCTO} from '../../queries';
import FormularioEditar from './FormularioEditarProducto';
class EditarProducto
 extends Component {
    state = {  }
    render() { 
        const {id} = this.props.match.params;
        return ( 
            <Fragment>
                <h1 className="text-center">Editar Producto</h1>
                <Query query={OBTENER_PRODUCTO} 
                        variables={{id}}>
                     {({loading, error, data, refetch}) =>{
                         if(loading) return "Cargando...";
                         if(error) return `Error ${error.message}`;
                         return(
                             <FormularioEditar
                                 producto={data}
                                 id={id}
                                 refetch={refetch}
                             />
                                 
                         )
                     }}       
                </Query>
            </Fragment>
           
         );
    }
}
 
export default EditarProducto
;