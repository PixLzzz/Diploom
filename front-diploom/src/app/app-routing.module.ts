import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolComponent } from './school/school.component';
import { HomeComponent } from './home/home.component';
import { SchoolHomeComponent } from './school-home/school-home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '' , component : HomeComponent},
    {path:'school' , component : SchoolComponent},
    {path:'schoolHome' , component : SchoolHomeComponent},
    {path:'login' , component : LoginComponent}

    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
