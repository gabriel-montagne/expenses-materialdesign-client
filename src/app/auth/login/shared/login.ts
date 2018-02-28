import * as jwt_decode from 'jwt-decode';

export interface ILogin {
  username: string;
  fullname: string;
  password: string;
}

export interface ILoginResponse {
  userid: number;
  username: string;
  fullname: string;
  email: string;
  role: string;
  token: string;
}

export class LoginResponse implements ILoginResponse {
  public userid: number;
  public username: string;
  public fullname: string;
  public email: string;
  public role: string;
  public token: string;

  constructor(token: string) {
    this.token = token;
    this.decodeToken();
  }

  private decodeToken(): void {
    switch (this.token) {
      case '':
        this.role = 'undefined';
        this.username = 'undefined';
        break;
      default:
        const tokenInfo = jwt_decode(this.token);
        this.role = tokenInfo.role;
        this.username = tokenInfo.username;
        this.fullname = tokenInfo.fullname;
        this.email = tokenInfo.email;
        this.userid = tokenInfo.userid;
    }
  }
}
