import { IDish } from "./dish";

export interface IOrder {
  Id: number;
  Dishes: IDish[];
  Table: number;
  CreatedDate: Date;
  Comment: string;
  IsExportRequested: boolean;
}


