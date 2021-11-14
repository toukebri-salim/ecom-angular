import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryAddComponent } from './components/private/admin/category/category-add/category-add.component';
import { CategoryListComponent } from './components/private/admin/category/category-list/category-list.component';
import { CategoryUpdateComponent } from './components/private/admin/category/category-update/category-update.component';
import { ClientListComponent } from './components/private/admin/client/client-list/client-list.component';
import { OrderListComponent } from './components/private/admin/order/order-list/order-list.component';
import { ProductAddComponent } from './components/private/admin/product/product-add/product-add.component';
import { ProductListComponent } from './components/private/admin/product/product-list/product-list.component';
import { ProductUpdateComponent } from './components/private/admin/product/product-update/product-update.component';
import { MyOrdersComponent } from './components/private/client/order/my-orders/my-orders.component';
import { DashboardComponent } from './components/private/shared/dashboard/dashboard.component';
import { HomeComponent } from './components/public/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { OrderDetailsComponent } from './components/private/admin/order/order-details/order-details.component';
import { AuthGuard } from './guards/auth.guard';
import { Page404Component } from './page404/page404.component';
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';
import { CategoryOneComponent } from './components/private/admin/category/category-one/category-one.component';

const routes: Routes = [
  //public routes
  {
    path: "",
    component: HomeComponent
  },

  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  //private routes
  //shared
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate:[AuthGuard]

    },
  
  //category list /admin
  {
    path: "admin",
    children: [
      {
        path: "category",
        children: [
          {
            path: "one/:id",
            component: CategoryOneComponent,
                    },
          {
            path: "list",
            component: CategoryListComponent,
                    },
          {
            path: "add",
            component: CategoryAddComponent,
                    },
          {
            path: "update/:id",
            component: CategoryUpdateComponent,
                    },

        ]
      },
      {
        path: "client",
        children: [
          {
            path: "list",
            component: ClientListComponent,
                    },
        ]
      },
      {
        path: "order",
        children: [
          {
            path: "list",
            component: OrderListComponent,
                    },
          {
            path: "details",
            component: OrderDetailsComponent,
                    },
        ]
      },
      {
        path: "product",
        children: [
          {
            path: "list",
            component: ProductListComponent,
                    },
          {
            path: "add",
            component: ProductAddComponent,
                    },
          {
            path: "update/:id",
            component: ProductUpdateComponent,
                    },
        ]
      },
    ],
    canActivateChild:[AdminGuard]

  },
  {
    path: "client",
    children: [
      {
        path: "orders",
        children: [{
          path: "myorders",
          component: MyOrdersComponent,
                },
        ]
      }
    ],
    canActivateChild:[ClientGuard]
  },
  {
    path: "**",
    component:Page404Component,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
