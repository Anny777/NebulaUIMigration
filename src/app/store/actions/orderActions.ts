import { IOrder } from "src/app/models/order";
import { Action } from '@ngrx/store';
import { IDish } from "src/app/models/dish";
import { DishState } from "src/app/models/dishState";

export const LOAD_ORDERS = '[Orders] Load';
export const LOAD_ORDERS_SUCCESS = '[Orders] Load success';
export const LOAD_ORDERS_FAIL = '[Orders] Load fail';

export const GET_ORDER = '[Order] Get';
export const GET_ORDER_SUCCESS = '[Order] Get success';
export const GET_ORDER_FAIL = '[Order] Get fail';

export const ADD_ORDER = '[Orders] Add';
export const ADD_ORDER_SUCCESS = '[Orders] Add success';
export const ADD_ORDER_FAIL = '[Orders] Add fail';

export const EXPORT_ORDER = '[Orders] Export';
export const EXPORT_ORDER_SUCCESS = '[Orders] Export success';
export const EXPORT_ORDER_FAIL = '[Orders] Export fail';

export const CLOSE_ORDER = '[Orders] Close';
export const CLOSE_ORDER_SUCCESS = '[Orders] Close success';
export const CLOSE_ORDER_FAIL = '[Orders] Close fail';

export const ADD_DISH = '[Orders] Add dish';
export const ADD_DISH_SUCCESS = '[Orders] Add dish success';
export const ADD_DISH_FAIL = '[Orders] Add dish fail';

export const REMOVE_DISH = '[Orders] Remove dish';
export const REMOVE_DISH_SUCCESS = '[Orders] Remove dish success';
export const REMOVE_DISH_FAIL = '[Orders] Remove dish fail';

export const ADD_COMMENT = '[Orders] Add comment';
export const ADD_COMMENT_SUCCESS = '[Orders] Add comment success';
export const ADD_COMMENT_FAIL = '[Orders] Add comment fail';

export const CHANGE_STATE = '[Orders] Change dish State';
export const CHANGE_STATE_SUCCESS = '[Orders] Change dish State Success';
export const CHANGE_STATE_FAIL = '[Orders] Change dish State Fail';

export const CLEAN_UP_AUDIO = '[Orders] Clean up audio';
export const MUTE_AUDIO = '[Orders] Mute audio';

export class CleanUpAudio implements Action {
  readonly type = CLEAN_UP_AUDIO;
}

export class MuteAudio implements Action {
  readonly type = MUTE_AUDIO;
  constructor(public payload: boolean) { }
}

export class LoadOrders implements Action {
  readonly type = LOAD_ORDERS;
}
export class LoadOrdersSuccess implements Action {
  readonly type = LOAD_ORDERS_SUCCESS;
  constructor(public payload: IOrder[]) { }
}
export class LoadOrdersFail implements Action {
  readonly type = LOAD_ORDERS_FAIL;
  constructor(public payload: any) { }
}

export class GetOrder implements Action {
  readonly type = GET_ORDER;
  constructor(public payload: number) { }
}
export class GetOrderSuccess implements Action {
  readonly type = GET_ORDER_SUCCESS;
  constructor(public payload: IOrder) { }
}
export class GetOrderFail implements Action {
  readonly type = GET_ORDER_FAIL;
  constructor(public payload: any) { }
}

export class AddOrder implements Action {
  readonly type = ADD_ORDER;
  constructor(public payload: IOrder) { }
}
export class AddOrderSuccess implements Action {
  readonly type = ADD_ORDER_SUCCESS;
  constructor(public payload: IOrder) { }
}
export class AddOrderFail implements Action {
  readonly type = ADD_ORDER_FAIL;
  constructor(public payload: any) { }
}

export class ExportOrder implements Action {
  readonly type = EXPORT_ORDER;
  constructor(public payload: number) { }
}

export class ExportOrderSuccess implements Action {
  readonly type = EXPORT_ORDER_SUCCESS;
}

export class ExportOrderFail implements Action {
  readonly type = EXPORT_ORDER_FAIL;
  constructor(public payload: number) { }
}

export class CloseOrder implements Action {
  readonly type = CLOSE_ORDER;
  constructor(public payload: number) { }
}
export class CloseOrderSuccess implements Action {
  readonly type = CLOSE_ORDER_SUCCESS;
}
export class CloseOrderFail implements Action {
  readonly type = CLOSE_ORDER_FAIL;
  constructor(public payload: any) { }
}

export class AddDish implements Action {
  readonly type = ADD_DISH;
  constructor(public payload: [IDish, number]) { };
}
export class AddDishSuccess implements Action {
  readonly type = ADD_DISH_SUCCESS;
  constructor(public payload: { dish: IDish, order: IOrder }) { };
}
export class AddDishFail implements Action {
  readonly type = ADD_DISH_FAIL;
  constructor(public payload: { dish: IDish, response: any }) { };
}

export class RemoveDish implements Action {
  readonly type = REMOVE_DISH;
  constructor(public payload: [IDish, number]) { };
}
export class RemoveDishSuccess implements Action {
  readonly type = REMOVE_DISH_SUCCESS;
  constructor(public payload: { dish: IDish, order: IOrder }) { };
}
export class RemoveDishFail implements Action {
  readonly type = REMOVE_DISH_FAIL;
  constructor(public payload: { dish: IDish, response: any }) { };
}

export class AddComment implements Action {
  readonly type = ADD_COMMENT;
  constructor(public payload: IOrder) { }
}

export class AddCommentSuccess implements Action {
  readonly type = ADD_COMMENT_SUCCESS;
  constructor(public payload: IOrder) { }
}

export class AddCommentFail implements Action {
  readonly type = ADD_COMMENT_FAIL;
  constructor(public payload: any) { }
}

export class ChangeState implements Action {
  readonly type = CHANGE_STATE;
  constructor(public payload: { dish: IDish, state: DishState }) { }
}

export class ChangeStateSuccess implements Action {
  readonly type = CHANGE_STATE_SUCCESS;
  constructor(public payload: { dish: IDish, order: IOrder }) { }
}

export class ChangeStateFail implements Action {
  readonly type = CHANGE_STATE_FAIL;
  constructor(public payload: any) { }
}

export type Actions =
  LoadOrders | LoadOrdersSuccess | LoadOrdersFail
  | GetOrder | GetOrderSuccess | GetOrderFail
  | AddOrder | AddOrderSuccess | AddOrderFail
  | ExportOrder | ExportOrderSuccess | ExportOrderFail
  | CloseOrder | CloseOrderSuccess | CloseOrderFail
  | AddDish | AddDishSuccess | AddDishFail
  | RemoveDish | RemoveDishSuccess | RemoveDishFail
  | AddComment | AddCommentSuccess | AddCommentFail
  | ChangeState | ChangeStateSuccess | ChangeStateFail
  | CleanUpAudio | MuteAudio;
