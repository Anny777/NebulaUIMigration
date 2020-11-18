import { Component, OnInit } from '@angular/core';
import { ListDishService } from '../services/dish-order.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  constructor(private listDish: ListDishService) { }
  

  ngOnInit() {

  }
  

}
