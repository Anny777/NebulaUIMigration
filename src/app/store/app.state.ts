import { IOrderState } from "./reducers/orderReducer";
import { IDishState } from "./reducers/dishReducer";
import { ITableState } from "./reducers/tableReducer";
import { IUserState } from "./reducers/userReduser";

export interface IAppState{
  readonly orders: IOrderState,
  readonly dishes: IDishState,
  readonly table: ITableState,
  readonly user: IUserState
}
