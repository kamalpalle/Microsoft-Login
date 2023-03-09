import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  
  constructor(private authService: AuthService) { }
  
  login() {
    this.authService.login();
  }
  
  isLoggedIn(): boolean {
    const accounts = this.authService.getAllAccounts();
    return accounts.length > 0;
  }
    
  logout() {
    this.authService.logout();
  }
}
