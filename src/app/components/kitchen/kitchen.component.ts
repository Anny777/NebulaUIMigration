import { Component, OnInit } from '@angular/core';
import { IAppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/models/order';
import { WorkshopType } from 'src/app/models/workShopType';
import { DishState } from 'src/app/models/dishState';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  orders$: Observable<IOrder[]>;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.orders$ = this.store.select(c => c.orders.orders.filter(order => {
      if (order.Dishes &&
        order.Dishes.length > 0 &&
        order.Dishes.some(c => c.WorkshopType == WorkshopType.Kitchen &&
          [DishState.InWork, DishState.CancellationRequested].some(s => s == c.State)
        )) {
        return true;
      }
    }));
  }
}
