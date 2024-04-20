import {
  AfterViewInit,
  Component,
  Inject,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation,
  inject,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { LayoutComponent } from "./components/layout/layout.component";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { GlobalService } from "./services/global.service";
import { FormsModule } from "@angular/forms";
import { SharedZorroModule } from "./shared/shared-zorro.module";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "../environments/environment";
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
export class AppComponent implements AfterViewInit {
  title = "app-landing-titanq";
  isMutedSound = false;
  audio: any;

  mouseX = 0;
  mouseY = 0;
  ballX = 0;
  ballY = 0;
  speed = 0.1;

  currentLang: string = "es";
  countries = [
    { name: "English", nameEs: "Inglés", code: "en" },
    { name: "Spanish", nameEs: "Español", code: "es" },
  ];

  private translate = inject(TranslateService);
  private authService = inject(AuthService);

  @ViewChild("idBall", { static: false }) ball: any;

  constructor(
    private router: Router,
    public globalService: GlobalService,
    @Inject(PLATFORM_ID) private platformId: any // private gtag: Gtag
  ) {
    router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event) => {
        let path = event.url;
        if (path) {
          path = path.split("?");
          path = path[0].split("#");
          path = path[0];
          this.globalService.currentRoute = path;
        }
      });

    if (isPlatformBrowser(this.platformId)) {
      try {
        const lang = localStorage.getItem("lang");
        if (lang) {
          this.changeLanguage(lang);
        } else {
          let userLang: any = navigator.language;
          userLang = userLang.split("-");
          if (userLang && userLang[0]) {
            this.changeLanguage(userLang[0]);
          } else {
            this.changeLanguage("en");
          }
        }

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
        this.changeLanguage("en");
      }
    }
  }

  ngAfterViewInit() {}

  changeLanguage(lang: string): void {
    this.globalService.subjectLanguage.next(lang);
    this.currentLang = lang;
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("lang", lang);
    }
  }
}
