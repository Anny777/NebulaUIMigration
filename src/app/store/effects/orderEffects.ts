import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as OrderActions from "../actions/orderActions";
import * as TableActions from "../actions/tableActions";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { OrderService } from "src/app/services/order.service";
import { of } from "rxjs";
import { DishService } from "src/app/services/dish.service";
import { DishState } from "src/app/models/dishState";
import { Store } from "@ngrx/store";
import { IAppState } from "../app.state";

@Injectable()
export class orderEffects {
  constructor(
    private actions$: Actions,
    private dishService: DishService,
    private orderService: OrderService,
    private store: Store<IAppState>
  ) { }
  @Effect()
  loadOrders$ = this.actions$.ofType(OrderActions.LOAD_ORDERS)
    .pipe(
      switchMap(c => this.orderService.getList()
        .pipe(
          map(orders => new OrderActions.LoadOrdersSuccess(orders)),
          switchMap(loadSuccess => [
            new TableActions.UpdateTable(loadSuccess.payload),
            loadSuccess]
          ),
          catchError(error => of(new OrderActions.LoadOrdersFail(error)))
        )
      ));

  @Effect()
  addOrder$ = this.actions$.ofType<OrderActions.AddOrder>(OrderActions.ADD_ORDER)
    .pipe(
      switchMap(c => this.orderService.create(c.payload)
        .pipe(
          map(o => new OrderActions.AddOrderSuccess(o)),
          catchError(error => of(new OrderActions.AddOrderFail(error)))
        )
        .pipe(
          tap(c => this.store.dispatch(new OrderActions.LoadOrders()))
        )
      ));

  @Effect()
  exportOrder$ = this.actions$.ofType<OrderActions.ExportOrder>(OrderActions.EXPORT_ORDER)
    .pipe(
      switchMap(c => this.orderService.export(c.payload)
        .pipe( 
          map(r => new OrderActions.ExportOrderSuccess()),
          catchError(error => of(new OrderActions.ExportOrderFail(error)))
        )
        .pipe(
          tap(c => this.store.dispatch(new OrderActions.LoadOrders()))
        )
      ));

  @Effect()
  closeOrder$ = this.actions$.ofType<OrderActions.CloseOrder>(OrderActions.CLOSE_ORDER)
    .pipe(
      switchMap(c => this.orderService.close(c.payload)
        .pipe(
          map(r => new OrderActions.CloseOrderSuccess()),
          catchError(error => of(new OrderActions.CloseOrderFail(error)))
        )
        .pipe(
          tap(c => this.store.dispatch(new OrderActions.LoadOrders()))
        )
      ));

  @Effect()
  removeDish$ = this.actions$.ofType<OrderActions.RemoveDish>(OrderActions.REMOVE_DISH)
    .pipe(
      switchMap(c => this.dishService.SetState(c.payload[0], DishState.CancellationRequested)
        .pipe(
          map(o => new OrderActions.RemoveDishSuccess({ dish: c.payload[0], order: o })),
          catchError(error => of(new OrderActions.RemoveDishFail({ dish: c.payload[0], response: error })))
        )
      ));

  @Effect()
  addDish$ = this.actions$.ofType<OrderActions.AddDish>(OrderActions.ADD_DISH)
    .pipe(
      switchMap(c => this.dishService.addDish(c.payload[0], c.payload[1])
        .pipe(
          map(o => new OrderActions.AddDishSuccess({ dish: c.payload[0], order: o })),
          catchError(r => of(new OrderActions.AddDishFail({ dish: c.payload[0], response: r.error })))
        )
      ));

  @Effect()
  addComment$ = this.actions$.ofType<OrderActions.AddComment>(OrderActions.ADD_COMMENT)
    .pipe(
      switchMap(c => this.orderService.addComment(c.payload)
        .pipe(
          map(o => new OrderActions.AddCommentSuccess(o)),
          catchError(r => of(new OrderActions.AddCommentFail(r)))
        )
      ));

  @Effect()
  getOrder$ = this.actions$.ofType<OrderActions.GetOrder>(OrderActions.GET_ORDER)
    .pipe(
      switchMap(c => this.orderService.get(c.payload)
        .pipe(
          map(order => new OrderActions.GetOrderSuccess(order)),
          catchError(r => of(new OrderActions.GetOrderFail(r)))
        )
      ));

  @Effect()
  changeState$ = this.actions$.ofType<OrderActions.ChangeState>(OrderActions.CHANGE_STATE)
    .pipe(
      switchMap(
        c => this.dishService.SetState(c.payload.dish, c.payload.state)
          .pipe(
            map(o => new OrderActions.ChangeStateSuccess({ dish: c.payload.dish, order: o })),
            catchError(error => of(new OrderActions.ChangeStateFail(error)))
          )
          .pipe(
            tap(c => this.store.dispatch(new OrderActions.LoadOrders()))
          )
      ));
}
