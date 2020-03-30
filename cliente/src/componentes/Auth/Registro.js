import React, {Component, Fragment} from 'react';
import {Mutation} from 'react-apollo';
import {NUEVO_USUARIO} from '../../mutations';
import Error from '../Alertas/Error';
import {withRouter} from 'react-router-dom';
const initialState = {
    usuario : '',
    password : '',
    repetirPassword : '',
    nombre : '',
    rol: ''
}
class Registro extends Component {
    state = { 
        ...initialState
     }

     limpiarState = () =>{
         this.setState({
             ...initialState
         })
     }
     crearRegistro = (e, crearUsuario) =>{
        e.preventDefault();
        crearUsuario().then(data =>{
            this.limpiarState();

            //Redireccionamiento al login
            this.props.history.push('/login');
        })
     }
     actualizarState = e =>{
        const {name, value} = e.target;
        this.setState({
            [name] : value

        });
     }

     validarForm = () =>{
         const {usuario, password, repetirPassword, nombre, rol} = this.state;
         const noValido = !usuario || !nombre || !rol || !password || password !== repetirPassword;
         return noValido;
     }
    render() { 
        const {usuario, password, repetirPassword, nombre, rol} = this.state;
        return ( 
           <Fragment>
               <h1 className="text-center mb-5">Nuevo Usuario</h1>
                <div className="row  justify-content-center">
                    <Mutation mutation={NUEVO_USUARIO}
                              variables={{usuario, password, nombre, rol}}  
                    >
                    {(crearUsuario, {loading, error, data})=>{
                        return (
                            <form 
                            className="col-md-8"
                            onSubmit={e => this.crearRegistro(e, crearUsuario)}
                            >
                                {error && <Error error={error}/>}
                               <div className="form-group">
                               <label>Usuario</label>
                               <input 
                               onChange = {this.actualizarState}
                               type="text" 
                               name="usuario" 
                               className="form-control" 
                               placeholder="Nombre Usuario" 
                               />
                               <small className="form-text text-muted">
                                    (Sin espacios y sin caracteres especiales)
                               </small>
                                </div>
                                <div className="form-group">
                               <label>Nombre</label>
                               <input 
                               onChange = {this.actualizarState}
                               type="text" 
                               name="nombre" 
                               className="form-control" 
                               placeholder="Nombre Completo" 
                               />
                                </div>
                                <div className="form-row">
                                <div className="form-group col-md-6">
                                   <label>Password</label>
                                   <input
                                   onChange = {this.actualizarState} 
                                       type="password" 
                                       name="password" 
                                       className="form-control" 
                                       placeholder="Password"
                                   />
                               </div>
                               <div className="form-group">
                                   <label>Repetir Password</label>
                                   <input 
                                       onChange = {this.actualizarState}
                                       type="password" 
                                       name="repetirPassword" 
                                       className="form-control" 
                                       placeholder="Repetir Password" 
                                   />
                               </div>
                                </div>
                               <div className="form-group">
                                    <label>Rol:</label>
                                    <select
                                        className ="form-control"
                                        value = {rol}
                                        name = "rol"
                                        onChange = {this.actualizarState}
                                    >
                                        <option value="">Elegir...</option>
                                        <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                                        <option value="VENDEDOR">VENDEDOR</option>
                                    </select>
                               </div>
   
                               <button 
                                   disabled = {this.validarForm()}
                                   type="submit" 
                                   className="btn btn-success float-right">
                                       Crear Usuario
                               </button>
                   </form>  
                        )
                    }}        
                    
                </Mutation>
            </div>
           </Fragment>
         );
    }
}
export default withRouter(Registro);