import { AuthGuard } from './ngrx/services/auth-guard.service';
import { DashComponent } from "./dash/dash.component";
import { LoginComponent } from "./login/login.component";
import { BlogComponent } from "./blog/blog.component";
import { UsersComponent } from "./dash/users/users.component";

import { ArticlesComponent } from "./dash/articles/articles.component";

import { Routes } from "@angular/router";

import { UserComponent } from "./user/user.component";

import { TypographyComponent } from "./typography/typography.component";

export const AppRoutes: Routes = [
  {
    path: 'dashbord',
    component: DashComponent,
    canActivate : [AuthGuard],
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        component: UsersComponent,
        canActivate : [AuthGuard]
      },
      {
        path: 'articles',
        component: ArticlesComponent,
        canActivate : [AuthGuard]
      }
    ]
  },
  {
    path : 'blog',
    component : BlogComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'login',
    component : LoginComponent
  }

];

