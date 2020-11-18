import { Injectable } from '@angular/core';
import { ITable } from '../models/table'

@Injectable({
  providedIn: 'root'
})
export class TableService {
  tables: ITable[] =
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
    ];

  getTable(number: number) {
    return this.tables.find(c=>c.number == number);
  }
}
