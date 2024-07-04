import { Injectable } from '@angular/core';
import { JwtPayload } from '../models/jwt-payload.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private _localStorageTokenKey: string = 'token';

  constructor() { }

  public storeToken(token: string){
    localStorage.setItem(this._localStorageTokenKey, token);
  }

  public loadToken(): string | null {
    return localStorage.getItem(this._localStorageTokenKey);
  }

  private getPayload(token: string): JwtPayload{
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  private tokenExpired(token: string): boolean {
    const expiry = this.getPayload(token).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  public removeToken(){
    localStorage.removeItem(this._localStorageTokenKey);
    localStorage.removeItem('email');
    localStorage.removeItem('role');
  }

  public isValid(): boolean{
    const token: string | null = this.loadToken();

    if(!token){
      return false;
    }

    if(this.tokenExpired(token)){
      this.removeToken();
      return false;
    }

    return true;
  }

  public getUserId():number{

    const token = this.loadToken();

    if(token != null){
      const checkedToken : string = token!;
      const userId = this.getPayload(checkedToken).userId;

      return userId;
    } else {
      //error message toevoegen
      return  0;
    }

  }

  public getEmail(): string{

    const token = this.loadToken();
    if(token != null){
      const checkedToken : string = token!;
      const email = this.getPayload(checkedToken).email;
      return email;
    } else {
      //error message toevoegen
      return "";
    }
  }



}
