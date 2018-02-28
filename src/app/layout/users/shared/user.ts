export interface IUser {
    id: number;
    username: string;
    fullname: string;
    email: string;
    role: string;
    profile: IUserProfile;
}

export interface IUserProfile {
    userId: number;
    first_name: string;
    last_name: string;
    picture_url: string;
}

export class UserProfile implements IUserProfile {
    public userId: number;
    public first_name: string;
    public last_name: string;
    public picture_url: string;

    constructor(elem: any) {
        this.userId = elem.userId;
        this.first_name = elem.first_name;
        this.last_name = elem.last_name;
        this.picture_url = elem.picture_url;
    }
}

export class User implements IUser{
    public id: number;
    public username: string;
    public fullname: string;
    public email: string;
    public role: string;
    public profile: UserProfile;

    constructor(elem: any) {
        this.id = elem.id;
        this.username = elem.username;
        this.fullname = elem.fullname;
        this.email = elem.email;
        this.role = elem.role;
        if (elem.profile) {
            this.profile = new UserProfile(elem.profile);
        }
    }
}
