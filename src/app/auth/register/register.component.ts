import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.email, Validators.required, Validators.maxLength(64), Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
      repeated_password: ['', [Validators.required]]
    });
  }

  public onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (authResponse: { token: string }) => {
          console.log(authResponse.token, 'User registered');
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Registration error:', error);        }
      });
    }
  }
}
