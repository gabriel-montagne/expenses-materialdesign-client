export interface IOAuthLogin {
  email: string;
  idToken: string;
  accessToken: string;
  oauthType: string;
  name: string;
  image: string;
  uid: string;
}

export class GoogleOauthLogin implements IOAuthLogin {
  public email: string;
  public idToken: string;
  public accessToken: string;
  public oauthType: string;
  public name: string;
  public image: string;
  public uid: string;

  constructor(element){
    this.email = element.email;
    this.idToken = element.idToken;
    this.accessToken = element.token;
    this.oauthType = element.provider;
    this.name = element.name;
    this.image = element.image;
    this.uid = element.uid;
  }
}
