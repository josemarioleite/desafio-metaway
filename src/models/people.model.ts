export interface People {
  id: number
  nome: string
  cpf: string
  endereco: Endereco
}

export interface FileInfo {
  lastModified: number
  lastModifiedDate: Date
  name: string
  size: number
  type: string
  webkitRelativePath: string
}

export interface Foto {
  id: string
  name: string
  type: string
}

export interface Endereco {
  id: number
  logradouro: string
  numero: number
  cep: string
  bairro: string
  cidade: string
  estado: string
  pais: string
}

export function CreateEmptyPeople(): People {
  return {
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
  }
}