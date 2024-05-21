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

export interface UserChangePassword {
  newPassword: string
  password: string
  username: string
}