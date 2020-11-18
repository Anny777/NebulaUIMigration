import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/models/order';
import { WorkshopType } from 'src/app/models/workShopType';
import { DishState } from 'src/app/models/dishState';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  orders$: Observable<IOrder[]>;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.orders$ = this.store.select(c => c.orders.orders.filter(order => {
      if (order.Dishes &&
        order.Dishes.length > 0
        // &&
        // order.Dishes.some(c => c.WorkshopType == WorkshopType.Bar &&
        //   [DishState.InWork, DishState.CancellationRequested, DishState.Taken].some(s => s == c.State)
        // )
        ) {
        return true;
      }
    }));
  }
}
