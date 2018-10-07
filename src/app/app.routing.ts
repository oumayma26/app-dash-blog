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
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'articles',
        component: ArticlesComponent
      }
    ]
  },
  {
    path : 'blog',
    component : BlogComponent
  },
  {
    path : 'login',
    component : LoginComponent
  }

];

//     {
//       path : '',
//       redirectTo: 'users',
//       pathMatch: 'full'
//     },

//     {
//       path: 'users',
//       component: UsersComponent
//     },
//     {
//         path: 'articles',
//         component: ArticlesComponent
//     },
//     {
//       path: 'blog',
//       component: BlogComponent

//     },
//     {
//       path: 'login',
//       component: LoginComponent
//     }
// ];

// // {
// //   path: '',
// //   component: UsersComponent,
// //   children : [
// //     {
// //       path: '',
// //       children: [
// //         {
// //             path: 'articles',
// //             component: ArticlesComponent
// //         },
// //         {
// //             path: 'users',
// //             component: UsersComponent
// //         }
// //       ]
// //     }
// //   ]
// // },
// // {
// // path: 'blog',
// // component: BlogComponent,
// // children: [
// //   {
// //     path: '',
// //     children : [
// //       {
// //          path: 'blog', component: BlogComponent , outlet: 'blog'
// //       }
// //     ]
// //   }
// // ]
// // }
// // ];
