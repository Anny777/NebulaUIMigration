import { Component, OnInit, Input, Injectable } from '@angular/core';
import { TableService } from '../services/table.service';
import { DataService } from '../services/data.service';
import { ListDishService } from '../services/dish-order.service';
import { OrderViewModel } from '../model/orderViewModel';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
 

export class TableComponent implements OnInit {
  @Input() number: number;

  table = { }

  message : string;
  openOrders = new Array<OrderViewModel>();
  color : boolean;

  constructor(private tableService : TableService, private data: DataService, private openOrder : ListDishService) {
    this.number = this.number;
    this.data = data;
  }

  ngOnInit() {
    this.table = this.tableService.getTable(this.number);
    this.openOrder.getOpenOrder().subscribe(result=> this.res(result));
  }

  public res(result:any)
  {
    this.openOrders = result;
    console.log(this.openOrders);
    for(var i = 0; i < this.openOrders.length; i++){
      if(this.openOrders[i] && this.openOrders[i].Table == this.number)
      {
        this.color = true;
      }

    }
  }

  numberTable(num: number) {
   this.data.setNumTable(num);
  }
}
