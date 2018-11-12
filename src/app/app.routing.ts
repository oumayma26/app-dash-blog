import { NewArticleComponent } from './blog/new-article/new-article.component';
import { HomeblogComponent } from './blog/homeblog/homeblog.component';
import { AuthGuard } from './ngrx/services/auth-guard.service';
import { DashComponent } from "./dash/dash.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import { BlogComponent } from "./blog/blog.component";
import { UsersComponent } from "./dash/users/users.component";

import { ArticlesComponent } from "./dash/articles/articles.component";

import { Routes } from "@angular/router";

import { UserComponent } from "./user/user.component";

import { TypographyComponent } from "./typography/typography.component";
import { MyArticlesComponent } from './blog/my-articles/my-articles.component';

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
    canActivate : [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeblogComponent,
        canActivate : [AuthGuard]
      },
      {
        path: 'myarticles',
        component: MyArticlesComponent,
        canActivate : [AuthGuard]
      },
      {
        path: 'newarticle',
        component: NewArticleComponent,
        canActivate : [AuthGuard]
      }
    ]
  },
  {
    path : 'login',
    component : LoginComponent
  },

  {
    path : 'register',
    component : RegisterComponent
  },
  {path: '', redirectTo : 'dashbord/users' ,  pathMatch: 'full', canActivate: [AuthGuard] }

];

