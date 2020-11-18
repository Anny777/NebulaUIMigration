import { ITable } from "src/app/models/table";
import * as TableActions from '../actions/tableActions'
import { DishState } from "src/app/models/dishState";

export interface ITableState {
  tables: ITable[]
}

const initialState: ITableState = {
    tables:
    [
      { number: 4, style: 'tableBase rectangle'   , busy: false, readyDishesCount: 0 },
      { number: 3, style: 'tableBase square'      , busy: false, readyDishesCount: 0 },
      { number: 2, style: 'tableBase square'      , busy: false, readyDishesCount: 0 },
      { number: 1, style: 'tableBase rectangle'   , busy: false, readyDishesCount: 0 },
      { number: 5, style: 'tableBase rectangle'   , busy: false, readyDishesCount: 0 },
      { number: 6, style: 'tableBase square'      , busy: false, readyDishesCount: 0 },
      { number: 11, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0 },
      { number: 12, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0 },
      { number: 13, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0 },
      { number: 14, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0 },
      { number: 15, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0 },
      { number: 16, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0 },
      { number: 17, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0 },
      { number: 18, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0 },
      { number: 21, style: 'tableBase square'     , busy: false, readyDishesCount: 0 },
      { number: 22, style: 'tableBase square'     , busy: false, readyDishesCount: 0 },
      { number: 23, style: 'tableBase square'     , busy: false, readyDishesCount: 0 }
    ]
};

export function tableReducer(state: ITableState = initialState, action: TableActions.Actions): ITableState {
  switch (action.type) {
    case TableActions.UPDATE_TABLE:
      var orders = action.payload;
      var result = initialState.tables.copyWithin(0, 0);
      result.forEach(table => {
        table.busy = !!orders.find(c => c.Table == table.number);
        try {
          table.readyDishesCount = orders.filter(c => c.Table == table.number)
            .reduce((p, c) =>
              c.Dishes.filter(d => d.State == DishState.Ready).length + p, 0
            );
        } catch (error) {
          table.readyDishesCount = 0;
        }
      });

      return { ...state, tables: result };
    default:
      return state;
  }
}
