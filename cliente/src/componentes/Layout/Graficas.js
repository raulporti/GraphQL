import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
const BotonGraficas = ({session}) => {
    const {rol} =session.session.obtenerUsuario;
    if(rol !== 'ADMINISTRADOR') return null;
    return ( 
        <Fragment>
            <li className="nav-item dropdown ml-2">
                        <button
                            className="nav-link dropdown-toggle btn btn-block btn-success"
                            data-toggle="dropdown">
                            Graficas
                            </button>  
                         <div className="dropdown-menu" aria-labelledby="navegacion">
                             <Link to="/grafica/clientes" className="dropdown-item">
                                 Clientes
                             </Link>
                             <Link to="/grafica/vendedores" className="dropdown-item">
                                 Vendedores
                             </Link>
                             </div>   
                    </li>
        </Fragment>
     );
}
 
export default BotonGraficas;