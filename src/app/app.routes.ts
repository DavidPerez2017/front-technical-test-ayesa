import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
// import { ServicesComponent } from "./pages/our-services/services.component";
// import { FenixComponent } from "./pages/fenix/fenix.component";
// import { ClientsComponent } from "./pages/clients/clients.component";
// import { OurTeamComponent } from "./pages/our-team/our-team.component";

export const routes: Routes = [
  {
    path: "",
    title: "",
    component: HomeComponent,
  },

  // {
  //   path: 'services',
  //   title: 'Services',
  //   component: ServicesComponent,
  // },

  // {
  //   path: 'fenix',
  //   title: 'Fénix',
  //   component: FenixComponent,
  // },
  // {
  //   path: 'our-team',
  //   title: 'Our team',
  //   component: OurTeamComponent,
  // },

  // {
  //   path: 'clients',
  //   title: 'Clients',
  //   component: ClientsComponent,
  // },

  {
    path: "**",
    redirectTo: "",
  },
];
