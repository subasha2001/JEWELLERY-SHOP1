import { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { AdminPageComponent } from './components/pages/admin-page/admin-page.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterPageComponent } from './components/pages/register/register.component';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Routes = [
    {path:'', component:HomePageComponent},
    {path:'admin', component:AdminPageComponent},
    {path:'search/:searchTerm', component:HomeComponent},
    {path:'product/:id', component:ProductPageComponent},
    {path:'metalType/:metalTypeName', component:HomeComponent},
    {path:'category/:categoryName', component:HomeComponent},
    {path:'delete/:id', component:HomePageComponent},
    {path:'contact', component:ContactComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterPageComponent}
];
