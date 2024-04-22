import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { AdminUsersComponent } from "./pages/admin-users/admin-users.component";
import { RegisterComponent } from "./pages/register/register.component";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: "login",
    title: "Login",
    component: LoginComponent,
  },
  {
    path: "register",
    title: "Registro",
    component: RegisterComponent,
  },
  {
    path: "users",
    title: "Gestión de usuarios",
    component: AdminUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "home",
    title: "Inicio",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "**",
    redirectTo: "login",
  },
];
