import { Component, OnInit, Input } from '@angular/core';
import { ListDishService } from '../services/dish-order.service';
import { OrderViewModel } from '../model/orderViewModel';
import { DishListComponent } from '../dish-list/dish-list.component';
import { WorkshopType } from '../model/enum-WorkShopType';
import { DishState } from '../model/enum-dishState';

@Component({
  selector: 'app-cooking',
  templateUrl: './cooking.component.html',
  styleUrls: ['./cooking.component.css']
})
export class CookingComponent implements OnInit {

  arrayOrders = [];
  @Input() WorkType: number;

  constructor(private listDish: ListDishService) { }

  ngOnInit() {
    this.arrayOrders = this.listDish.arrOrders;
    this.listDish.OnArrayUpdated.subscribe(r => this.arrayOrders = r);
  }

  public filterWorkType(): OrderViewModel[] {
    var result = [];
    for (let i = 0; i < this.arrayOrders.length; i++) {
      const element = this.arrayOrders[i];
      var checkWorkType = false;
      var dishes = [];
      for (let j = 0; j < element.Dishes.length; j++) {
        const dish = element.Dishes[j];
        if(dish.WorkshopType== this.WorkType && (dish.State == DishState.InWork || dish.State == DishState.CancellationRequested)){
          dishes.push(dish);
        }
      }
      if (dishes.length > 0) {
        var order = new OrderViewModel();
        order.Id = element.Id;
        order.Table = element.Table;
        order.Dishes = dishes;
        
        result.push(order);
      }
    }
    return result;
  }

  public ready(id:number){
    this.listDish.setReady(id).subscribe(result=> console.log(result));
  }

}
