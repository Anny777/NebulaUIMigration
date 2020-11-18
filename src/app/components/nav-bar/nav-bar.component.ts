import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import * as OrderActions from '../../store/actions/orderActions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  role: boolean = false;
  user: string = "";
  isVolumeOn: boolean = false;
  constructor(private auth: AuthService, private router: Router, private orderService: OrderService, private store: Store<IAppState>) { }
  private isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated;
    this.auth.authChanged.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
      if (isAuth) {
        this.orderService.init();
        this.user = this.auth.userInfo.Email;
      }
    });
    this.auth.getUserInfo(this.auth).subscribe();

  }
  public logout() {
    this.auth.logout(() => this.router.navigate(['/login']));
  }

  toggleVolume(value: boolean) {
    console.log(value);
    this.isVolumeOn = value;
    this.store.dispatch(new OrderActions.MuteAudio(value));
  }

  public userIsInRole(roles: Array<string>) {
    return this.auth.userIsInRole(roles);
  }

}
