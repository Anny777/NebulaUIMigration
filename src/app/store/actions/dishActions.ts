import { IDish } from "src/app/models/dish";
import { Action } from '@ngrx/store';
import { IOrder } from "src/app/models/order";
import { DishState } from "src/app/models/dishState";

export const LOAD_DISHES = '[Dish] Load';
export const LOAD_DISHES_SUCCESS = '[Dish] Load Success';
export const LOAD_DISHES_FAIL = '[Dish] Load Fail';

export const ADD_DISH = '[Dish] Add';
export const ADD_DISH_SUCCESS = '[Dish] Add Success';
export const ADD_DISH_FAIL = '[Dish] Add Fail';

export class LoadDishes implements Action {
  readonly type = LOAD_DISHES;
}

export class LoadDishesSuccess implements Action {
  readonly type = LOAD_DISHES_SUCCESS;
  constructor(public payload: IDish[]) { }
}

export class LoadDishesFail implements Action {
  readonly type = LOAD_DISHES_FAIL;
  constructor(public payload: any) { }
}

export type Actions = LoadDishes | LoadDishesSuccess | LoadDishesFail;

