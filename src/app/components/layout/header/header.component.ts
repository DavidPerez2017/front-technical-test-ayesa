import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
  inject,
} from "@angular/core";

import { NzModalService } from "ng-zorro-antd/modal";
import { Router } from "@angular/router";
import { GlobalService } from "../../../services/global.service";
import { SharedZorroModule } from "../../../shared/shared-zorro.module";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { TitanqUtils } from "../../../libraries/utils";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [SharedZorroModule, CommonModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { ngSkipHydration: "true" },
})
export class HeaderComponent implements OnInit {
  visibleMenuMobile: boolean = false;

  currentClient: string = "";

  public getScreenWidth: any;
  public getScreenHeight: any;

  @HostListener("window:resize", ["$event"])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  private translate = inject(TranslateService);
  public globalService = inject(GlobalService);

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;
    }
  }

  ngAfterContentInit(): void {
    this.globalService.subjectLanguage.subscribe((lang) => {
      if (lang) {
        this.translate.setDefaultLang(lang);
        this.translate.use(lang);
      }
    });
  }

  change(event: any): void {}

  closeSesion(): void {
    // this.timeService.activeTimes = []
    // this.layoutService.setType('full')
    // this.authService.closeSesion()
    // this.timeService.counters = {}
  }

  openHeader(): void {
    // this.layoutService.title = 'Mis notas'
    // this.router.navigate(['/notes'])
  }

  goRouter(path: string, id?: string): void {
    if (id) {
      this.router.navigate([path], { fragment: id });
    } else {
      this.router.navigate([path]);
    }

    this.closeDrawer();
  }

  scroll(event: any, element: string, center?: boolean): void {
    TitanqUtils.scroll(event, element, center);
    this.closeDrawer();
  }

  openEmail() {
    if (isPlatformBrowser(this.platformId)) {
      this.globalService.eventGoogleAnalytics("click-email", "click");
      window.location.href = "mailto:werepairhouseus@gmail.com";
    }
  }

  close(): void {
    this.visibleMenuMobile = false;
  }

  closeDrawer(): void {
    setTimeout(() => {
      this.visibleMenuMobile = false;
    }, 500);
  }

  clickWhatAsApp(): void {
    this.globalService.eventGoogleAnalytics(
      "click-whatasApp",
      "click",
      "click-whatasApp"
    );
    window.open(
      "https://wa.me/19087644319?text=Hello%20I%20need%20a%20service",
      "_blank"
    );
  }
}
