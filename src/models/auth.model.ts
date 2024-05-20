export interface Auth {
  username: string
  password: string
}

export interface AuthAccess {
  id: string
  username: string
  tipos: Array<string>
  accessToken: string
  tokenType: string
}
