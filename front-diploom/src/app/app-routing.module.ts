import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolComponent } from './school/school.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '' , component : HomeComponent},
    {path:'school' , component : SchoolComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
