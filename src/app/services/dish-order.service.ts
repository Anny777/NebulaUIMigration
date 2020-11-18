import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { OrderViewModel } from '../model/orderViewModel';
import { Observable, interval } from '../../../node_modules/rxjs';
import { DishState } from '../model/enum-dishState';

@Injectable({
  providedIn: 'root'
})
export class ListDishService {

  @Output() OnDishInWork = new EventEmitter<boolean>();
  @Output() OnDishReady = new EventEmitter<OrderViewModel[]>();
  @Output() OnDishTaken = new EventEmitter<boolean>();

  @Output() OnDishCancelReq = new EventEmitter<boolean>();
  @Output() OnDishDelete = new EventEmitter<boolean>();
  @Output() OnArrayUpdated = new EventEmitter<OrderViewModel[]>();

  arrOrders: Array<OrderViewModel> = [];

  constructor(private http: HttpClient) {
    // Опрос сервера каждую секунду, чтобы была актуальная информация по заказам
    const intervalObs = interval(2000);
    intervalObs.subscribe(c => {
      this.getOpenOrder().subscribe(arrayOrders => this.respon(arrayOrders));
    });
  }

  public respon(arrayOrders: any) {
    if (this.arrOrders.length == 0) {
      this.arrOrders = arrayOrders;
      return;
    }
    for (var i = 0; i < arrayOrders.length; i++) {
      const order = arrayOrders[i];
      // Узнаю есть ли уже такой заказ
      var uniqOrder = this.arrOrders.map(c => c.Id).indexOf(order.Id);
      // Такой заказ имеется в массиве, нужно проверить блюда лежащие в нем
      if (~uniqOrder) {
        // Достаю имеющийся заказ
        var existingOrder = this.arrOrders[uniqOrder];
        // Нужно пройти циклом по его блюдам и сравнить CookingId
        for (let j = 0; j < existingOrder.Dishes.length; j++) {
          // Достаю блюдо из заказа
          const existElement = existingOrder.Dishes[j];
          const comeElement = order.Dishes[j];
          // Если CookingDishId не равны между собой тогда добавляем в имеющийся заказ
          if (existElement.CookingDishId != comeElement.CookingDishId) {
            existingOrder.Dishes.push(order.Dishes[j]);
            this.arrOrders.push(existingOrder);
            this.OnDishInWork.emit();
          }
          // Если равны, то проверяем статусы, вдруг они являются готовыми
          else {
            switch (comeElement.State) {
              case DishState.Ready:
              existElement.State = comeElement.State;
                this.OnDishReady.emit(order);
                break;
              case DishState.Taken:
                this.OnDishTaken.emit();
                break;
              case DishState.CancellationRequested:
                this.OnDishCancelReq.emit(order);
                break;
              case DishState.Deleted:
                this.OnDishDelete.emit(order);
                break;
              default:
                break;
            }
          }
        }
      }
      else {
        this.arrOrders.push(arrayOrders[i]);
        this.OnDishInWork.emit();
      }
      this.OnArrayUpdated.emit(this.arrOrders);
    }
  }

  public getListDishes() {
    return this.http.get("api/dish/List");
  }

  public createNewOrder(param: OrderViewModel) {
    return this.http.post("api/Order/New", param);
  }

  public getOpenOrder(): Observable<OrderViewModel> {
    return this.http.get<OrderViewModel>("api/Order/List");
  }

  public setReady(id: number): Observable<any> {
    console.log("Готово!"+ id);
    return this.http.post("api/Order/SetState?id=" + id + "&dishState=3", {});
  }
  public setDeleted(id: number): Observable<any> {
    return this.http.post("api/Order/SetState?id=" + id + "&dishState=1", {});
  }
}

