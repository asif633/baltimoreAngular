import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CrimeDataComponent } from './crime-data/crime-data.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HeaderComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'crime-data', component: CrimeDataComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
