import React, { Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
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
import Session from './componentes/Sesion';
import GraficaClientes from './componentes/Panel/Clientes';
import GraficaVendedores from './componentes/Panel/Vendedores';
import Usuarios from './componentes/Auth/Usuarios';
import EditarUsuario from './componentes/Auth/EditarResgistro';
  const App = ({refetch, session}) => {
    const {obtenerUsuario} = session;
    const mensaje = (obtenerUsuario) ? `Bienvenido: ${obtenerUsuario.nombre}`: <Redirect to ="/login"/>;
    return(
      <Router>
        <Fragment>
        <Header session={session}/>
            <div className="container">
            <p className="text-right">{mensaje}</p> 
       <Switch>
            
            <Route exact path="/clientes" render ={() => <Clientes session={session}/>}/>
            <Route exact path="/clientes/editar/:id" component={EditarCliente}/>

            <Route exact path="/clientes/nuevo" render ={() => <NuevoCliente session={session}/>}/>
            <Route exact path="/productos/nuevo" component={NuevoProducto}/>
            <Route exact path="/productos" component={Productos}/>  
            <Route exact path="/productos/editar/:id" component={EditarProducto}/>  
            <Route exact path="/pedidos/nuevo/:id" render ={() => <NuevoPedido session={session}/>}/>  
            <Route exact path="/pedidos/:id" component={PedidosCliente}/>  
            <Route exact path="/registro" render ={() => <Registro session={session}/>}/> 
            <Route exact path="/usuarios" component={Usuarios}/>
            <Route exact path="/usuarios/editar/:id" component={EditarUsuario}/>
            <Route exact path="/login" render={() => <Login refetch={refetch} />}/> 
            <Route exact path="/panel" component={Panel}/>  
            <Route exact path="/grafica/clientes" component={GraficaClientes}/>
            <Route exact path="/grafica/vendedores" component={GraficaVendedores}/>
       </Switch>
      </div>
        </Fragment>
     
      </Router>
    )
  }
//export default App;

const RootSession = Session(App);
export {RootSession}