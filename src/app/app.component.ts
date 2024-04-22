import {
  Component,
  Inject,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation,
  inject,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { LayoutComponent } from "./components/layout/layout.component";
import { GlobalService } from "./services/global.service";
import { FormsModule } from "@angular/forms";
import { SharedZorroModule } from "./shared/shared-zorro.module";
import { AuthService, User } from "./services/auth.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [LayoutComponent, SharedZorroModule, CommonModule, FormsModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  encapsulation: ViewEncapsulation.None,
  host: { ngSkipHydration: "true" },
})
export class AppComponent {
  private authService = inject(AuthService);

  @ViewChild("idBall", { static: false }) ball: any;

  constructor(
    public globalService: GlobalService,
    @Inject(PLATFORM_ID) private platformId: any // private gtag: Gtag
  ) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const localUser = localStorage.getItem("user");
        let user: User = {
          email: "",
          name: "",
          password: "",
          isAuthenticate: false,
        };
        if (localUser) {
          user = JSON.parse(localUser);
        }
        const token = localStorage.getItem("tok");
        if (user && token) {
          this.authService.setUser(user);
          this.authService.setToken(token);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
