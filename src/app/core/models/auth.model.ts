export interface Modulo {
  nombre: string;
  ruta: string;
  icono?: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  id_perfil: number;
  modulos: Modulo[];
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  usuario: Usuario;
}