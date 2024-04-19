import {
  Component,
  OnInit,
  AfterContentInit,
  ViewChild,
  ViewEncapsulation,
  PLATFORM_ID,
  Inject,
  inject,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";
import { SharedZorroModule } from "../../shared/shared-zorro.module";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { NgOptimizedImage } from "@angular/common";
import { TitanqUtils } from "../../libraries/utils";
import { GlobalService } from "../../services/global.service";
import { TranslateService } from "@ngx-translate/core";
import { NzCarouselComponent } from "ng-zorro-antd/carousel";

@Component({
  selector: "our-team",
  standalone: true,
  imports: [CommonModule, SharedZorroModule, NgOptimizedImage, CommonModule],
  templateUrl: "./our-team.component.html",
  styleUrls: ["./our-team.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { ngSkipHydration: "true" },
})
export class OurTeamComponent implements OnInit, AfterContentInit {
  array = [
    {
      id: "1",
      name: "David",
      jobPosition: "CEO",
      jobPositionEs: "Director ejecutivo",
      urlImage: "/assets/icons/our-team/david.png",
      style: "",
    },

    {
      id: "2",
      name: "Sergio",
      jobPosition: "CTO",
      jobPositionEs: "Director de tecnología",
      bg: "/assets/icons/our-team/bg2.png",
      urlImage: "/assets/icons/our-team/sergio.png",
      style: "",
    },

    {
      id: "3",
      name: "Eliana",
      jobPosition: "CGO",
      jobPositionEs: "Directora de crecimiento",
      urlImage: "/assets/icons/our-team/eliana.png",
      style: "",
    },

    {
      id: "4",
      name: "Ricardo",
      jobPosition: "Designer",
      jobPositionEs: "Diseñador",
      bg: "/assets/icons/our-team/bg4.png",
      urlImage: "/assets/icons/our-team/ricardo.png",
      style: "",
    },

    {
      id: "5",
      name: "Marcela",
      jobPosition: "CFO",
      jobPositionEs: "Directora financiera",
      urlImage: "/assets/icons/our-team/marcela.png",
      style: "",
    },
    {
      id: "6",
      name: "Paula",
      jobPosition: "Senior Development",
      jobPositionEs: "Desarrolladora Senior",
      urlImage: "/assets/icons/our-team/paula.png",
      style: "",
    },
    {
      id: "7",
      name: "Santiago",
      jobPosition: "Semi-senior Development",
      jobPositionEs: "Desarrollador Semi-senior",
      urlImage: "/assets/icons/our-team/santiago.png",
      style: "",
    },
    {
      id: "8",
      name: "Laura",
      jobPosition: "QA",
      jobPositionEs: "QA",
      urlImage: "/assets/icons/our-team/laura.png",
      style: "",
    },
  ];

  @ViewChild("idCarruselClients", { static: false }) idCarruselClients: any;

  private activatedRoute = inject(ActivatedRoute);
  private translate = inject(TranslateService);
  public globalService = inject(GlobalService);
  currentLang = "en";

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.title.setTitle("TITANQ | Nuestro equipo.");
    this.meta.addTag({
      title: "description",
      content: "Profesionales TITANQ que garantizan software de calidad",
    });

    this.meta.addTag({
      title: "keywords",
      content: "Equipo TITANQ, Our team",
    });
  }

  ngOnInit(): void {
    // if (isPlatformBrowser(this.platformId)) {
    // }
  }

  ngAfterContentInit(): void {
    const fragment = this.activatedRoute.snapshot.fragment;
    if (fragment) {
      if (isPlatformBrowser(this.platformId)) {
        try {
          this.scroll(null, fragment, true);
        } catch (e) {}
      }
    }

    this.globalService.subjectLanguage.subscribe((lang) => {
      if (lang) {
        this.currentLang = lang;
        this.translate.setDefaultLang(lang);
        this.translate.use(lang);
      }
    });
  }

  scroll(event: any, element: string, noAnimate?: boolean): void {
    TitanqUtils.scroll(event, element, noAnimate);
  }

  next(): void {
    this.idCarruselClients.next();
  }

  previus(): void {
    this.idCarruselClients.pre();
  }
}
