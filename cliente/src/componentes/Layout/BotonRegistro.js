import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
const BotonRegistro = ({session}) => {
    const {rol} = session.session.obtenerUsuario;
    if(rol !== 'ADMINISTRADOR') return null;
    return ( 
        <Fragment>
            <li className="nav-item dropdown ml-2">
                        <button
                            className="nav-link dropdown-toggle btn btn-block btn-success"
                            data-toggle="dropdown">
                            Usuarios
                            </button>  
                         <div className="dropdown-menu" aria-labelledby="navegacion">
                             <Link to="/usuarios" className="dropdown-item">
                                 Ver Usuarios
                             </Link>
                             <Link to="/registro" className="dropdown-item">
                                 Nuevo Usuario
                             </Link>
                             </div>   
                    </li>
        </Fragment>  
     );
}
 
export default BotonRegistro;