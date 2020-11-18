import { IOrder } from "src/app/models/order";
import * as OrderActions from '../actions/orderActions'
import { IDishLoading } from "src/app/models/dishLoading";
import { IDish } from "src/app/models/dish";

export interface IOrderState {
  isSoundActivated: boolean[],
  isSoundMuted: boolean,
  orders: IOrder[],
  isOrdersLoading: boolean,
  isOrderAdd: boolean,
  isOrderClose: boolean,
  isOrderExport: boolean,
  dishLoading: IDishLoading[]
}

const initialState: IOrderState = {
  isSoundActivated: [],
  isSoundMuted: false,
  orders: [],
  isOrdersLoading: false,
  isOrderAdd: false,
  isOrderClose: false,
  isOrderExport: false,
  dishLoading: []
};

export function orderReducer(state: IOrderState = initialState, action: OrderActions.Actions): IOrderState {

  switch (action.type) {
    case OrderActions.CLEAN_UP_AUDIO:
      let t1 = Array.from(state.isSoundActivated).filter(f => f);
      t1 = t1.slice(t1.length - 1);
      return { ...state, isSoundActivated: t1 };
    case OrderActions.LOAD_ORDERS:
      return { ...state, isOrdersLoading: true };
    case OrderActions.LOAD_ORDERS_SUCCESS:
      return {
        ..._mergeOrders(action.payload, state),
        isOrdersLoading: false,
        dishLoading: state.dishLoading.map(dishLoading => {
          dishLoading.isLoading = false;
          return dishLoading;
        })
      }

    case OrderActions.MUTE_AUDIO:
      return { ...state, isSoundMuted: action.payload };
    case OrderActions.LOAD_ORDERS_FAIL:
      return { ...state, isOrdersLoading: true };

    case OrderActions.ADD_ORDER:
      return { ...state, isOrderAdd: true };
    case OrderActions.ADD_ORDER_SUCCESS:
      return { ...state, isOrderAdd: false };
    case OrderActions.ADD_ORDER_FAIL:
      return { ...state, isOrderAdd: false };

    case OrderActions.GET_ORDER:
      return state;
    case OrderActions.GET_ORDER_SUCCESS:
      return state;
    // return {
    //   ...state,
    //   orders: state.orders.map(order => {
    //     if (order.Id == action.payload.Id) {
    //       return _mergeOrder(action.payload, order).o;
    //     }
    //     return order;
    //   })
    // };
    case OrderActions.GET_ORDER_FAIL:
      return state;


    case OrderActions.EXPORT_ORDER:
      return { ...state, isOrderExport: true };
    case OrderActions.EXPORT_ORDER_SUCCESS:
      return { ...state, isOrderExport: false };
    case OrderActions.EXPORT_ORDER_FAIL:
      return { ...state, isOrderExport: true };

    case OrderActions.CLOSE_ORDER:
      return { ...state, isOrderClose: true };
    case OrderActions.CLOSE_ORDER_SUCCESS:
      return { ...state, isOrderClose: false };
    case OrderActions.CLOSE_ORDER_FAIL:
      return { ...state, isOrderClose: true };

    case OrderActions.ADD_DISH:
      return {
        ...state,
        dishLoading: toggleDishLoading(state.dishLoading, action.payload[0], true)
      };
    case OrderActions.ADD_DISH_SUCCESS:
      var s = {
        ...state,
        dishLoading: toggleDishLoading(state.dishLoading, action.payload.dish, false),
        orders: state.orders.map(order => {
          if (order.Id == action.payload.order.Id) {
            return action.payload.order;
          }

          return order;
        }),
        currentOrder: action.payload.order
      }
      return s;
    case OrderActions.ADD_DISH_FAIL:
      return {
        ...state,
        dishLoading: toggleDishLoading(state.dishLoading, action.payload.dish, false)
      };

    case OrderActions.REMOVE_DISH:
      return {
        ...state,
        dishLoading: toggleDishLoading(state.dishLoading, action.payload[0], true)
      };
    case OrderActions.REMOVE_DISH_SUCCESS:
      console.log(action.payload.dish.CookingDishId);
      return {
        ...state,
        dishLoading: toggleDishLoading(state.dishLoading, action.payload.dish, false)
      };
    case OrderActions.REMOVE_DISH_FAIL:
      return {
        ...state,
        dishLoading: toggleDishLoading(state.dishLoading, action.payload.dish, false)
      };

    case OrderActions.CHANGE_STATE:
      return {
        ...state,
        dishLoading: toggleDishLoading(state.dishLoading, action.payload.dish, true)
      };
    case OrderActions.CHANGE_STATE_SUCCESS:
      return {
        ...state
        // ,
        // dishLoading: toggleDishLoading(state.dishLoading, action.payload.dish, false)
      };
    case OrderActions.CHANGE_STATE_FAIL:
      return {
        ...state
        // ,
        // dishLoading: toggleDishLoading(state.dishLoading, action.payload.dish, false)
      };

    default:
      return state;

  }
}

function _mergeOrders(orders: IOrder[], state: IOrderState): IOrderState {
  // Сразу обновляем если один из массивов пуст
  if ((state.orders.length == 0 && orders.length > 0) || (orders.length == 0 && state.orders.length > 0)) {
    console.log('full refresh');
    return {
      ...state,
      orders: orders
    }
  }

  // Добавляем новые и обновляем статусы блюд
  let isChanged = false;
  let currentOrders = state.orders.map(currentOrder => currentOrder);
  for (let orderIndex = 0; orderIndex < orders.length; orderIndex++) {
    const order = orders[orderIndex];
    const currentOrder = currentOrders.find(c => c.Id == order.Id)

    if (!currentOrder) {
      console.log('new order', order);
      currentOrders.push(order);
      isChanged = true;
    } else {
      if (currentOrder.Comment != order.Comment) {
        currentOrder.Comment = order.Comment;
        isChanged = true;
      }
      if (currentOrder.IsExportRequested != order.IsExportRequested) {
        currentOrder.IsExportRequested = order.IsExportRequested;
        isChanged = true;
      }
      isChanged = _mergeOrder(order, currentOrder).r ? true : isChanged;
    }
  }

  // Удаляем то что не пришло с сервера
  currentOrders = currentOrders.filter(co => {
    var r = orders.some(o => o.Id == co.Id);
    if (!r) {
      isChanged = true;
      console.log('order removed', co);
    }

    return r;
  });

  currentOrders.forEach(co => {
    var o = orders.find(c => c.Id == co.Id);
    if (!o) { return; }

    co.Dishes = co.Dishes
      .filter(cd => {
        var r = o.Dishes.some(d => d.CookingDishId == cd.CookingDishId);
        if (!r) {
          isChanged = true;
          console.log('dish removed', cd);
        }

        return r;
      });
  });

  if (isChanged) {
    console.log('state changed');

    return {
      ...state,
      orders: orders,
      isSoundActivated: _getAudios(state)
    }
  }

  console.log('not changed');
  return state;
}

function _getAudios(state: IOrderState) {
  let audios = [true];
  if (state.isSoundActivated.length < 500) {
    audios = Array.from(state.isSoundActivated);
    audios.push(true);
  }

  return audios;
}

function _mergeOrder(order: IOrder, currentOrder: IOrder): { o: IOrder, r: boolean } {
  var r = { o: currentOrder, r: false };
  for (let dishIndex = 0; dishIndex < order.Dishes.length; dishIndex++) {
    const dish = order.Dishes[dishIndex];
    const currentDish = currentOrder.Dishes.find(c => c.CookingDishId == dish.CookingDishId);
    r.r = _mergeDishes(currentDish, dish, currentOrder).r ? true : r.r;
    if (r.r) { console.log('order changed!') }
  }

  return r;
}

function _mergeDishes(currentDish: IDish, dish: IDish, currentOrder: IOrder): { o: IOrder, r: boolean } {
  var result = { o: currentOrder, r: false };
  if (!currentDish) {
    console.log('new dish', dish);
    currentOrder.Dishes.push(dish);
    result.r = true;
  } else
    if (dish && currentDish.State != dish.State) {
      console.log('new dish state', dish);
      currentDish.State = dish.State;
      result.r = true;
    }

  return result;
}

export function toggleDishLoading(loadings: IDishLoading[], dish: IDish, flag: boolean): IDishLoading[] {
  console.log('loadings', loadings);
  if (loadings && !loadings.some(c => c.dish.CookingDishId == dish.CookingDishId)) {
    loadings.push({
      dish: dish,
      isLoading: false
    });
  }
  return loadings.map(dl => {
    if (dl.dish.CookingDishId == dish.CookingDishId) {
      dl.isLoading = flag;
    }

    return dl;
  })
}
