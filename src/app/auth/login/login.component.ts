import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../auth-response.model';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {AuthRequest} from "../auth-request.model";

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule],
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent{

    email: string = '';
    password: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    onLogin(): void {
        const authRequest = new AuthRequest(this.email, this.password);
        this.authService.login(authRequest).subscribe({
            next: (response) => {
                console.log('login successful', response);
                this.router.navigate(['/products']);
            },
            error: (error) => {
                console.error('login failed', error);
            }
        });
    }
}
