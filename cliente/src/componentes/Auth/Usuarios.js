import React, {Fragment, Component} from 'react';
import {OBTENER_USUARIOS} from '../../queries';
import { Query, Mutation } from 'react-apollo';
import { ELIMINAR_USUARIO } from '../../mutations';
import {Link} from 'react-router-dom';
import Exito from '../Alertas/Exito';
import Paginador from '../Paginador';
class Usuarios extends Component {
    state = {
        paginador: {
            offset: 0,
            actual: 1,
            limite: 2
        },
        alerta: {
            mostrar: false,
            mensaje: ''
        }
        
    }
    paginaAnterior = () =>{
        this.setState({
            paginador: {
            ...this.state.paginador,
            offset: this.state.paginador.offset - this.state.paginador.limite,
            actual: this.state.paginador.actual - 1,
            }
        })
    }

    paginaSiguiente = () => {
        this.setState({
            paginador: {
            ...this.state.paginador,
            offset: this.state.paginador.offset + this.state.paginador.limite,
            actual: this.state.paginador.actual + 1
            }
        })
    }
    render() { 
        const {alerta: {mostrar, mensaje}} = this.state;
        const alerta = (mostrar) ? <Exito mensaje={mensaje}/> :'';
        
        return ( 
            <Query query={OBTENER_USUARIOS} pollInterval={1000} variables={{limite: this.state.paginador.limite, offset: this.state.paginador.offset}}>
     {({loading, error, data, startPolling, stopPolling}) =>{
         if(loading) return "Cargando...";
         if(error) return `Error: ${error.message}`;
        console.log(data);
         return(
             <Fragment>
                 <h2 className="text-center">Listado Usuarios</h2>
                 {alerta}
                    <div className=" d-flex justify-content-end mb-2">
                        <h5 className="mr-2">Paginación</h5>
                    <select
                        defaultValue = {this.state.paginador.limite}
                        onChange={ e=> {
                            this.setState({
                                paginador: {
                                offset: 0,    
                                actual: 1,
                                limite: Number(e.target.value)
                                }                                       
                            })                           
                        }}
                        
                >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            </div>
                 <Paginador 
                    actual = {this.state.paginador.actual}
                    total = {data.totalClientes}
                    limite = {this.state.paginador.limite}
                    paginaAnterior = {this.paginaAnterior}
                    paginaSiguiente = {this.paginaSiguiente}
                 />
                 <ul className="list-group">
                    {data.obtenerUsuarios.map(item =>{
                        const {id} = item;
                        return( 
                        <li key={item.id} className="list-group-item">
                            <div className="row justify-content-betwen align-items-center">
                                <div className="col-md-6 d-flex justify-content-betwen align-items-center">
                                    {item.usuario} - {item.nombre} - {item.rol}  
                                </div>
                                <div className="col-md-6 d-flex justify-content-end">
                                    <Mutation mutation={ELIMINAR_USUARIO}
                                    onCompleted={(data)=>{
                                        this.setState({
                                            alerta: {
                                                mostrar: true,
                                                mensaje: data.eliminarCliente
                                            }
                                        }, ()=>{
                                            setTimeout(() => {
                                               this.setState({
                                                   alerta:{
                                                       mostrar: false,
                                                       mensaje: ''
                                                   }
                                               }) 
                                            }, 3000);
                                        })
                                    }}
                                    >
                                        {eliminarUsuario =>(
                                            <button type="button" 
                                            className="btn btn-danger d-block d-md-inline-block mr-2"
                                            onClick={()=>{
                                                if(window.confirm('Seguro que deseas eliminar el cliente?')){
                                        eliminarUsuario({
                                            variables: {id}
                                                 })
                                            }
                                    }}>
                                        &times; Eliminar
                                    </button>
                                        )}
                                        
                                    </Mutation>
                                    <Link to={`/usuarios/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                                        Editar Usuario
                                    </Link>

                                </div>
                            </div>
                        </li>
                        )    
                        })}    
                 </ul>
                 <Paginador 
                    actual = {this.state.paginador.actual}
                    total = {data.totalClientes}
                    limite = {this.state.paginador.limite}
                    paginaAnterior = {this.paginaAnterior}
                    paginaSiguiente = {this.paginaSiguiente}
                 />
             </Fragment>
             
         )
     }}       
    </Query>   
         );
    }
}
 
export default Usuarios;