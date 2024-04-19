import {
  Component,
  OnInit,
  AfterContentInit,
  ViewEncapsulation,
  PLATFORM_ID,
  Inject,
  inject,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";
import { SharedZorroModule } from "../../shared/shared-zorro.module";
import {
  CommonModule,
  NgOptimizedImage,
  isPlatformBrowser,
} from "@angular/common";
import { TitanqUtils } from "../../libraries/utils";
import { GlobalService } from "../../services/global.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "home",
  standalone: true,
  imports: [SharedZorroModule, NgOptimizedImage, TranslateModule, CommonModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { ngSkipHydration: "true" },
})
export class HomeComponent implements OnInit, AfterContentInit {
  tecnologysFront = [
    {
      code: 1,
      svg: "/assets/icons/tecnologys/angular.svg",
      title: "Angular",
      link: "https://angular.dev/",
      style: {},
    },
    {
      code: 2,
      svg: "/assets/icons/tecnologys/react.svg",
      title: "React",
      link: "https://react.dev/",
      style: {},
    },
    {
      code: 3,
      svg: "/assets/icons/tecnologys/android.svg",
      title: "Android",
      link: "https://developer.android.com/",
      style: {},
    },
    {
      code: 4,
      svg: "/assets/icons/tecnologys/ionic.png",
      title: "Ionic",
      style: {},
    },
    {
      code: 5,
      svg: "/assets/icons/tecnologys/electron.svg",
      title: "Electron",
      style: { height: "80px" },
    },
    {
      code: 4,
      svg: "/assets/icons/tecnologys/firebase.png",
      title: "Firebase",
      style: { height: "80px" },
    },
    {
      code: 1,
      svg: "/assets/icons/tecnologys/postgresql.png",
      title: "Postgres",
      style: {},
    },
  ];

  tecnologysBack = [
    {
      code: 2,
      svg: "/assets/icons/tecnologys/oracle.png",
      title: "Oracle",
      style: {},
    },
    {
      code: 3,
      svg: "/assets/icons/tecnologys/mysql.png",
      title: "Mysql",
      style: {},
    },
    {
      code: 5,
      svg: "/assets/icons/tecnologys/mongodb.png",
      title: "Mongo",
      style: { height: "80px" },
    },
    {
      code: 1,
      svg: "/assets/icons/tecnologys/nodejs.png",
      title: "Node Js",
      style: {},
    },
    {
      code: 2,
      svg: "/assets/icons/tecnologys/nestjs.svg",
      title: "Nest Js",
      style: {},
    },
    {
      code: 3,
      svg: "/assets/icons/tecnologys/netcore.png",
      title: ".Net Core",
      style: {},
    },
    {
      code: 5,
      svg: "/assets/icons/tecnologys/django.png",
      title: "Django",
      style: {},
    },
  ];

  private timeOutPresentation: any = [];
  private activatedRoute = inject(ActivatedRoute);
  private translate = inject(TranslateService);
  public globalService = inject(GlobalService);

  constructor(
    private router: Router,
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.title.setTitle("TITANQ | Inicio.");
    this.meta.addTag({
      name: "description",
      content:
        "TITANQ Ingeniería. Somos expertos en desarrollo de software. Aplicaciones web y móviles. Empresa desarrollo de software Manizales",
    });

    this.meta.addTag({
      name: "keywords",
      content: `Desarollo de software, Páginas web, aplicaciones móviles, Our company,
         Desarrollo de software Colombia, Desarrollo de software Manizales, Development software`,
    });

    // this.startPresentation();
    this.globalService.subjectSound.subscribe((isMuted) => {
      if (isMuted === true) {
        this.closeTimeOut();
      }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    }
  }

  ngAfterContentInit(): void {
    const fragment = this.activatedRoute.snapshot.fragment;
    if (fragment) {
      if (isPlatformBrowser(this.platformId)) {
        try {
          if (fragment == "idHome") {
            this.scroll(null, fragment, true);
          } else {
            this.scroll(null, fragment);
          }
        } catch (e) {}
      }
    }

    this.globalService.subjectLanguage.subscribe((lang) => {
      if (lang) {
        this.translate.setDefaultLang(lang);
        this.translate.use(lang);
      }
    });
  }
  scroll(event: any, element: string, noAnimate?: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.globalService.device.isMobile) {
        noAnimate = true;
      }
      TitanqUtils.scroll(event, element, noAnimate);
    }
  }

  startPresentation(): void {
    const time = setTimeout(() => {
      this.scroll(null, "idExperience");
    }, 5000);
    const time1 = setTimeout(() => {
      this.scroll(null, "idTecnologies");
    }, 10000);
    const time2 = setTimeout(() => {
      this.goRouter("/services", "idServices");
    }, 15000);
    this.timeOutPresentation.push(time);
    this.timeOutPresentation.push(time1);
    this.timeOutPresentation.push(time2);
  }

  closeTimeOut(): void {
    for (const pos in this.timeOutPresentation) {
      clearTimeout(this.timeOutPresentation[pos]);
    }
  }

  goRouter(path: string, id?: string): void {
    this.closeTimeOut();
    if (id) {
      this.router.navigate([path], { fragment: id });
    } else {
      this.router.navigate([path]);
    }
  }
}
