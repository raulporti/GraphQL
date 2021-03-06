import gql from 'graphql-tag';

export const NUEVO_CLIENTE = gql`
mutation crearCliente($input: ClienteInput){
    crearCliente(input: $input){
      id
      nombre
      apellido
    }
  }`;

export const ACTUALIZAR_CLIENTE = gql `
mutation actualizarCliente($input: ClienteInput){
  actualizarCliente(input: $input){
    id
    nombre
    apellido
    edad
    empresa
    tipo
    emails {
      email
    }    
  }
}
`;  

export const ELIMINAR_CLIENTE = gql `
mutation eliminarCliente($id: ID!){
  eliminarCliente(id: $id)
}
`;

export const NUEVO_PRODUCTO = gql`
mutation nuevoProducto($input: ProductoInput) {
  nuevoProducto(input: $input){
    nombre
    precio
    stock
  }
}
`;

export const ELIMINAR_PRODUCTO = gql `
mutation eliminarProducto($id: ID!){
  eliminarProducto(id: $id)
}
`;

export const ACTUALIZAR_PRODUCTO = gql `
mutation actualizarProducto($input: ProductoInput){
  actualizarProducto(input: $input){
    nombre
    precio
    stock
  }
}
`;

//Pedidos
export const NUEVO_PEDIDO = gql`
mutation nuevoPedido($input: PedidoInput){
  nuevoPedido(input: $input){
    id
  }
}
`;

export const ACTUALIZAR_ESTADO = gql`
mutation actualizarEstado($input: PedidoInput){
  actualizarEstado(input: $input)
}
`;

//Usuarios
export const NUEVO_USUARIO = gql`
mutation crearUsuario($usuario: String!, $nombre: String!, $rol: String! $password: String!){
  crearUsuario(usuario: $usuario, nombre: $nombre, rol: $rol, password: $password)
}
`;

export const AUTENTICAR_USUARIO = gql `
mutation autenticarUsuarios($usuario: String!, $password: String!){
  autenticarUsuario(usuario: $usuario, password: $password){
    token
  }
}
`; 
export const ELIMINAR_USUARIO = gql `
mutation eliminarUsuario($id: ID){
  eliminarUsuario(id: $id)
}
`;  