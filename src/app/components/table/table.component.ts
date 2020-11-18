import { Component, OnInit, Input } from "@angular/core";
import { ITable } from "src/app/models/table";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/store/app.state";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {
  @Input() number: number;
  table: ITable;

  constructor(
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.store
      .select(s => s.table.tables.find(t => t.number == this.number))
      .subscribe(table => this.table = table);
  }
}
