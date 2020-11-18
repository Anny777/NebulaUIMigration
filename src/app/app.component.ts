import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from './store/app.state';
import { tap } from 'rxjs/operators';
import * as OrderActions from './store/actions/orderActions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Nebula';
  isSoundActivated$: Observable<boolean[]>;
  isSoundMuted$: Observable<boolean>;
  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.isSoundActivated$ = this.store.select(c => c.orders.isSoundActivated).pipe(tap(c => console.log(c)));
    this.isSoundMuted$ = this.store.select(c => c.orders.isSoundMuted).pipe(tap(c => console.log(c)));

  }

  onCompleted() {
    this.store.dispatch(new OrderActions.CleanUpAudio())
  }
}

