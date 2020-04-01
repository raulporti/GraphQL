import React, { Fragment } from 'react';
const ResumenProducto = ({cantidad, producto}) => {
     return ( 
        <Fragment>
            <div className="contenedor-productos mb-4 p-4">
                <p className="card-text font-weight-bold">
                Nombre del Producto:&nbsp; 
                    <span className="font-weight-normal">
                        {producto.nombre}
                    </span>    
                </p>    
                <p className="card-text font-weight-bold">
                Cantidad del Producto:&nbsp; 
                    <span className="font-weight-normal">
                        {cantidad}
                    </span>    
                </p>
                <p className="card-text font-weight-bold">
                Precio del Producto:&nbsp; 
                    <span className="font-weight-normal">
                        ${producto.precio}
                    </span>    
                </p>
            </div>
        </Fragment>
     );
}
 
export default ResumenProducto;