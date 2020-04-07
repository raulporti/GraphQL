import React, {Fragment} from 'react';
import {Query} from 'react-apollo';
import {TOP_VENDEDORES} from '../../queries';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
const Vendedores = () => {
    return ( 
        <Fragment>
            <h1 className="text-center my-5">Top 10 de Vendedores</h1>
            <Query query={TOP_VENDEDORES}>
                {({loading, error, data})=>{
                    if(loading) return 'Cargando...';
                    if(error) return `Error ${error.message}`;
                    //console.log(data);
                    const topVendedoresGrafica = [];
                    data.topVendedores.map((ventas, index)=>{
                        topVendedoresGrafica[index]= {
                            ...ventas.vendedor[0],
                            total: ventas.total
                        }
                    })
                    return(
                        <BarChart width={800} height={400} data={topVendedoresGrafica}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="nombre"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey="total" fill="#8884d8" />
                  </BarChart>  
                    )
                }
                }
            </Query>
            </Fragment>
     );
}
 
export default Vendedores;