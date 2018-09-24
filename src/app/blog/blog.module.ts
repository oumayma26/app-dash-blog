import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';

const secondaryRoutes: Routes = [
   { path: 'blog',  component: BlogComponent }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(secondaryRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [BlogComponent]
})
export class BlogModule { }
