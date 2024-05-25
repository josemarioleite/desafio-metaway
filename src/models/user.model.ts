export interface User {
  id: number
  nome: string
  dataNascimento: string
  cpf: string
  email: string
  telefone: string
  username: string
  password: string
}

export interface UserDetail {
  tipos: string[]
  usuario: Partial<User>
}

export interface UserChangePassword {
  newPassword: string
  password: string
  username: string
}

export function CreateEmptyUser(): UserDetail {
  return {
    tipos: [''],
    usuario: {
      nome: '',
      cpf: '',
      dataNascimento: '',
      email: '',
      password: '',
      telefone: '',
      username: ''
    }
  }
}