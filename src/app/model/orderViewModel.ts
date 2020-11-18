import { DishViewModel } from "./dishViewModel";

export class OrderViewModel{
    Id : number;
    Dishes: Array<DishViewModel>;
    Table: number;
}