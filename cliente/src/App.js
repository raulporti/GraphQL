import React, {Component, Fragment} from 'react';
import {ApolloProvider} from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//Importar componentes
import Header from './componentes/Layout/header';
import Clientes from './componentes/Clientes/Clientes';
import EditarCliente from './componentes/Clientes/EditarCliente';
import NuevoCliente from './componentes/Clientes/NuevoCliente';
import NuevoProducto from './componentes/Productos/NuevoProducto';
import Productos from './componentes/Productos/Productos';
import EditarProducto from './componentes/Productos/EditarProducto';
import NuevoPedido from './componentes/Pedidos/NuevoPedido';
import PedidosCliente from './componentes/Pedidos/PedidosCliente';
import Panel from './componentes/Panel/Panel';
import Registro  from './componentes/Auth/Registro';
import Login from './componentes/Auth/Login';
const client = new ApolloClient({
 uri: "http://localhost:8000/graphql", 
 cache: new InMemoryCache({
  addTypename: false
 }),
 onError: ({networkError, graphQLErrors})=> {
   console.log('graphQLErrors', graphQLErrors);
   console.log('networkError', networkError);
 }
});
class App extends Component {
  render() {
    return (
    <ApolloProvider client={client}>
      <Router>
        <Fragment>
        <Header/>
     <div className="container"> 
       <Switch>
            
            <Route exact path="/clientes" component={Clientes}/>
            <Route exact path="/clientes/editar/:id" component={EditarCliente}/>

            <Route exact path="/clientes/nuevo" component={NuevoCliente}/>
            <Route exact path="/productos/nuevo" component={NuevoProducto}/>
            <Route exact path="/productos" component={Productos}/>  
            <Route exact path="/productos/editar/:id" component={EditarProducto}/>  
            <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido}/>  
            <Route exact path="/pedidos/:id" component={PedidosCliente}/>  
            <Route exact path="/registro" component={Registro}/> 
            <Route exact path="/login" component={Login}/> 

            <Route exact path="/panel" component={Panel}/>  

            
       </Switch>
      </div>
        </Fragment>
     
      </Router>
    </ApolloProvider>
    );
  }
}

export default App;
