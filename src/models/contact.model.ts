import { People } from './people.model'
import { User } from './user.model'

export interface Contato {
  id: number
  pessoa: People
  tag: string
  email: string
  telefone: string
  tipoContato: string
  privado: boolean
  usuario: User
}

export function CreateEmptyContact(): Contato {
  return {
    id: 0,
    pessoa: {
        id: 0,
        nome: '',
        cpf: '',
        endereco: {
            id: 0,
            logradouro: '',
            numero: 0,
            cep: '',
            bairro: '',
            cidade: '',
            estado: '',
            pais: ''
        }
    },
    tag: '',
    email: '',
    telefone: '',
    tipoContato: '',
    privado: false,
    usuario: {
        id: 0,
        nome: '',
        dataNascimento: '',
        cpf: '',
        email: '',
        telefone: '',
        username: '',
        password: ''
    }
}
}