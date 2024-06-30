export class LocalStorageInfo {
    email: string;
    token: string;
    role: string;

    constructor(email: string, token: string, role: string){
        this.email = email;
        this.token = token;
        this.role = role;
    }
}
