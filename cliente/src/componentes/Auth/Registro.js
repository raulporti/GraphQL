import React, {Component, Fragment} from 'react';
import {Mutation} from 'react-apollo';
import {NUEVO_USUARIO} from '../../mutations';
import Error from '../Alertas/Error';
import {withRouter} from 'react-router-dom';
const initialState = {
    usuario : '',
    password : '',
    repetirPassword : ''
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
         const {usuario, password, repetirPassword} = this.state;
         const noValido = !usuario || !password || password !== repetirPassword;
         return noValido;
     }
    render() { 
        const {usuario, password} = this.state;
        return ( 
           <Fragment>
               <h1 className="text-center mb-5">Nuevo Usuario</h1>
                <div className="row  justify-content-center">
                    <Mutation mutation={NUEVO_USUARIO}
                              variables={{usuario, password}}  
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
                                </div>
                               <div className="form-group">
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