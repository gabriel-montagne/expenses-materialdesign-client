import * as jwt_decode from 'jwt-decode';

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  username: string;
  role: string;
  token: string;
}

export class LoginResponse implements ILoginResponse {
  public username: string;
  public role: string;
  public token: string;

  constructor(token: string) {
    this.token = token;
    this.decodeToken();
  }

  private decodeToken(): void {
    const tokenInfo = jwt_decode(this.token);
    this.role = tokenInfo.role;
    this.username = tokenInfo.username;
  }
}
