import { Action } from '@ngrx/store';
import { IOrder } from 'src/app/models/order';

export const UPDATE_TABLE = '[Table] Count Ready Dish';

export class UpdateTable implements Action {
  readonly type = UPDATE_TABLE;
  constructor(public payload: IOrder[]) { }
}

export type Actions = UpdateTable;
