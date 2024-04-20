import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { AdminUsersComponent } from "./pages/admin-users/admin-users.component";
import { RegisterComponent } from "./pages/register/register.component";

export const routes: Routes = [
  {
    path: "login",
    title: "Login",
    component: LoginComponent,
  },
  {
    path: "register",
    title: "Register",
    component: RegisterComponent,
  },
  {
    path: "users",
    title: "Users",
    component: AdminUsersComponent,
  },
  {
    path: "home",
    title: "Inicio",
    component: HomeComponent,
  },

  {
    path: "**",
    redirectTo: "login",
  },
];
