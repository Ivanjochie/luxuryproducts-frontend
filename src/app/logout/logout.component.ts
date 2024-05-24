import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
      this.authService.logOut();
      setTimeout(()=> this.router.navigate(['/auth/login']), 3000);
  }
}
