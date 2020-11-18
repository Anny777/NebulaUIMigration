import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInput, MatIconModule, MatProgressSpinnerModule, MatFormFieldModule, MatBadgeModule } from '@angular/material';

import { AppComponent } from './app.component';
import { Hall1Component } from './components/hall1/hall1.component';
import { Hall2Component } from './components/hall2/hall2.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BarComponent } from './components/bar/bar.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { TableComponent } from './components/table/table.component';
import { TableService } from './services/table.service';
import { DishListComponent } from './components/dish-list/dish-list.component';
import { OrderService } from './services/order.service';
import { FilterPipeComponent } from './filter-pipe/filter-pipe.component';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { GroupByPipe } from './filter-pipe/groupBy-pipe';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Interceptor } from './services/interceptor';
import { StoreModule } from '@ngrx/store';
import { orderReducer } from './store/reducers/orderReducer';
import { ForgotComponent } from './components/forgot/forgot.component';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/app.effects';
import { dishReducer } from './store/reducers/dishReducer';
import { tableReducer } from './store/reducers/tableReducer';
import { userReducer } from './store/reducers/userReduser';
import { OrderComponent } from './components/order/order.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

// определение маршрутов
const appRoutes: Routes = [
  { path: '', component: Hall1Component },
  { path: 'hall-2', component: Hall2Component },
  { path: 'kitchen', component: KitchenComponent },
  { path: 'bar', component: BarComponent },
  { path: 'admin', component: AdministrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dishes', component: DishListComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'order/:id', component: DishListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    Hall1Component,
    Hall2Component,
    KitchenComponent,
    BarComponent,
    AdministrationComponent,
    TableComponent,
    DishListComponent,
    FilterPipeComponent,
    GroupByPipe,
    MatInput,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    OrderComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      orders: orderReducer,
      dishes: dishReducer,
      table: tableReducer,
      user: userReducer
    }),
    RouterModule.forRoot(appRoutes),
    EffectsModule.forRoot(effects),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    NgPipesModule,
    Ng2FilterPipeModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatBadgeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
  },
    TableService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
