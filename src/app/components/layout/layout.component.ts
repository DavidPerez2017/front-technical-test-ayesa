import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
  inject,
} from "@angular/core";

import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { GlobalService } from "../../services/global.service";
import { SharedZorroModule } from "../../shared/shared-zorro.module";
import { HeaderComponent } from "./header/header.component";
import { isPlatformBrowser } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [RouterOutlet, SharedZorroModule, HeaderComponent, FooterComponent],
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {
  itemCurrent: any;
  isCollapsed = false;
  screenWidth: number = 0;
  selectItem: any = null;

  public globalService = inject(GlobalService);

  constructor(
    public authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
  }

  ngOnInit(): void {
    if (
      this.globalService.device.isMobile ||
      this.globalService.device.isPhone
    ) {
      this.isCollapsed = true;
    } else {
      this.isCollapsed = false;
    }
  }

  setItem(item: any): void {
    this.itemCurrent = item;
    // this.layoutService.title = item.title;
    this.router.navigate([item.url]);
  }
}
