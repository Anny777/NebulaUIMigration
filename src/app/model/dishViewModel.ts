import { DishState } from "./enum-dishState";
import { WorkshopType } from "./enum-WorkShopType";

 
 export class DishViewModel{
        Id: number;
        CookingDishId: number;
        Name: string;
        Consist: string;
        Unit: string;
        State: DishState;
        Comment: string;
        Price: number;
        WorkshopType: WorkshopType;
 }