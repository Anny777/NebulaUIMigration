import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  pass: string;
  isLoading: boolean = false;
  public userInfo: IUser;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  /**
   * login
   */
  public login() {
    this.isLoading = true;
    this.auth.login(this.email, this.pass).subscribe(
      isAuth => {
        this.isLoading = false;
        if (isAuth) {
          if (isAuth.Roles.indexOf("Cook") > -1) {
            this.router.navigate(['/kitchen']);
          }

          else if (isAuth.Roles.indexOf("Bartender") > -1) {
            this.router.navigate(['/bar']);
          }

          else
            this.router.navigate(['/']);
        }
      },
      err => { this.isLoading = false; console.log(err); alert(err.error.error_description) });
  }
}
