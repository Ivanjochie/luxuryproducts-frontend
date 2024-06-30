import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './auth-response.model';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { AuthRequest } from './auth-request.model';
import { TokenService } from '../services/token.service';
import { User } from "../models/user.model";
import {LocalStorageInfo} from "../models/localStorage.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _loginEndpoint: string = 'http://localhost:8080/api/auth/login';
    private _registerEndpoint: string = 'http://localhost:8080/api/auth/register';

    user = new BehaviorSubject<User | null>(null);

    public $userIsLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private tokenService: TokenService) {
        if (this.tokenService.isValid()) {
            this.$userIsLoggedIn.next(true);
            const localStorageInfo: LocalStorageInfo = new LocalStorageInfo(
                localStorage.getItem('email') ?? '',
                this.tokenService.loadToken() ?? '',
                localStorage.getItem('role') ?? ''
            );
            this.processLogin(localStorageInfo);
            console.log('User is logged in (constructor)');
        }
        else {
            this.$userIsLoggedIn.next(false);
            console.log('User is not logged in (constructor)');
        }
    }

    public login(authRequest: AuthRequest): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(this._loginEndpoint, authRequest)
            .pipe(
                tap((authResponse: AuthResponse) => {
                    this.processLogin(authResponse);
                    console.log("ProcessLogin (login)")
                })
            );
    }

    isAdministrator(): boolean {
        const currentUser = this.user.getValue();
        console.log("Current User", currentUser);
        console.log("Current User Role", currentUser?.role);
        console.log("Current User Role", currentUser?.role === 'ROLE_ADMIN');

        return currentUser !== null && currentUser.role === 'ROLE_ADMIN';
    }

    processLogin(response: any): void {
        const user = new User(response.email, response.token, response.role);
        this.tokenService.storeToken(response.token);
        localStorage.setItem('email', response.email);
        localStorage.setItem('role', response.role);
        this.$userIsLoggedIn.next(true);
        this.user.next(user);
        console.log('User is logged in (login method)');
        console.log("UserRole In Auth Service", user.role);
    }

    public register(authRequest: AuthRequest): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(this._registerEndpoint, authRequest)
            .pipe(
                tap((authResponse: AuthResponse) => {
                    this.processLogin(authResponse);
                    console.log("ProcessLogin (register)")
                })
            );

    }

    public logOut(): void {
        this.tokenService.removeToken();
        this.$userIsLoggedIn.next(false);
        this.user.next(null);
    }

    public getEmail(): string {
        return this.tokenService.getEmail();
    }
}
