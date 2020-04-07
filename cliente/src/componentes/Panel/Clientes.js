import React, {Fragment} from 'react';
import {Query} from 'react-apollo';
import {TOP_CLIENTES} from '../../queries';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
const Clientes = () => {
    return ( 
        <Fragment>
            <h1 className="text-center my-5">Top 10 Clientes que mas compran</h1>
        <Query query={TOP_CLIENTES}>
            {({loading, error, data})=>{
                if(loading) return 'Cargando...';
                if(error) return `Error ${error.message}`;
                const topClientesGrafica = [];
                //console.log(data);
                data.topClientes.map((pedido, index)=>{
                    topClientesGrafica[index] = {
                        ...pedido.cliente[0],
                        total: pedido.total
                    }
                })
                return(
                    <BarChart width={800} height={400} data={topClientesGrafica}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <CartesianGrid strokeDasharray="3 3"/>
               <XAxis dataKey="nombre"/>
               <YAxis/>
               <Tooltip/>
               <Legend />
               <Bar dataKey="total" fill="#8884d8" />
              </BarChart>   
                )
            }}    
        </Query>
        </Fragment>
     );
}
 
export default Clientes;

