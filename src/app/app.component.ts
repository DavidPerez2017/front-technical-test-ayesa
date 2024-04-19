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

declare var gtag: Function;

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
        this.startGoogleAnalytics();
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
        // this.gtag.event("screen_view", {
        //   app_name: "We repair house",
        //   screen_name: "Home",
        // });
      } catch (error) {
        this.changeLanguage("en");
      }
    }
  }

  ngAfterViewInit() {}

  playSound(): void {
    const source = "assets/sounds/soundhome.mp3";
    this.audio = new Audio(source);
    this.audio.loop = true;
    this.audio.autoplay = true;
  }

  mutedSound(): void {
    if (this.audio) {
      this.audio.muted = !this.audio.muted;
      this.isMutedSound = this.audio.muted;
      this.globalService.subjectSound.next(this.isMutedSound);
    } else {
      this.isMutedSound = !this.isMutedSound;
    }
  }

  changeLanguage(lang: string): void {
    this.globalService.subjectLanguage.next(lang);
    this.currentLang = lang;
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("lang", lang);
    }
  }

  startGoogleAnalytics(): void {
    if (environment.production) {
      // dynamically add analytics scripts to document head
      try {
        this.onRouteChange();
        const url = "https://www.googletagmanager.com/gtag/js?id=";
        const gTagScript = document.createElement("script");
        gTagScript.async = true;
        gTagScript.src = `${url}${environment.googleAnalyticsId}`;
        document.head.appendChild(gTagScript);

        const dataLayerScript = document.createElement("script");
        dataLayerScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${environment.googleAnalyticsId}', {'send_page_view': false});`;
        document.head.appendChild(dataLayerScript);
      } catch (e) {
        console.error("Error adding Google Analytics", e);
      }
    }
  }

  private onRouteChange() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag("config", environment.googleAnalyticsId, {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }
}
