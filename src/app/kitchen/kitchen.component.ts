import { Component, OnInit } from '@angular/core';
import { ListDishService } from '../services/dish-order.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
