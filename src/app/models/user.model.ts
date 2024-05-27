export class User{

    constructor(
        public email: string,
        private _token: string,
        private _role: string

    ){}

    get token(){
        return this._token;
    }

    set role(role: string){
        this._role = role;
    }

    get role(){
        return this._role;
    }

}
