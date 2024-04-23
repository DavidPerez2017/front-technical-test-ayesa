import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
  inject,
} from "@angular/core";
import { Router } from "@angular/router";
import { GlobalService } from "../../../services/global.service";
import { SharedZorroModule } from "../../../shared/shared-zorro.module";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../../services/auth.service";

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

  public getScreenWidth: any;
  public getScreenHeight: any;

  @HostListener("window:resize", ["$event"])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  private translate = inject(TranslateService);
  public globalService = inject(GlobalService);
  public authService = inject(AuthService);

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

  logout(): void {
    this.authService.logout();
  }

  goRouter(path: string, id?: string): void {
    if (id) {
      this.router.navigate([path], { fragment: id });
    } else {
      this.router.navigate([path]);
    }

    this.closeDrawer();
  }

  close(): void {
    this.visibleMenuMobile = false;
  }

  closeDrawer(): void {
    setTimeout(() => {
      this.visibleMenuMobile = false;
    }, 500);
  }


  openMenuMobile(): void {
    this.visibleMenuMobile = true;
  }

  closeMainMobile(): void {
    this.visibleMenuMobile = false;
  }
}
