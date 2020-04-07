import React, {Fragment, Component} from 'react';
import {OBTENER_USUARIO} from '../../queries';
import {Query} from 'react-apollo';
import FormularioEditarRegistro from './FormularioEditarRegistro';
class EditarUsuario extends Component {
    state = {  }
    render() { 
        const { id } = this.props.match.params;
        return ( 
            <Fragment>
                <h2 className="text-center">Editar Usuario</h2>  
           <div className="row justify-content-center">
                <Query query={OBTENER_USUARIO} variables={{id}}>
                        {({loading, error, data, refetch}) => {
                            if(loading) return 'Cargando...';
                            if(error) return `Error: ${error.message}`;     
                            return(
                                <FormularioEditarRegistro
                                    usuario={data.obtenerUsuario}    
                                    refetch={refetch}
                                />
                   )
                }}
                </Query> 
           </div>
            </Fragment>
         );
    }
}
 
export default EditarUsuario;