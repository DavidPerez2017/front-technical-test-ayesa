import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';

import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { SharedZorroModule } from '../../shared/shared-zorro.module';
import { HeaderComponent } from './header/header.component';
import { isPlatformBrowser } from '@angular/common';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SharedZorroModule, HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {
  itemCurrent: any;
  isCollapsed = false;
  screenWidth: number = 0;
  selectItem: any = null;


  constructor(
    private router: Router,
    private globalService: GlobalService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    // this.router.events.subscribe((val) => {
    //   if (val instanceof NavigationEnd) {
    //     this.selectItem = this.layoutService.getSelectItem(val.url);
    //   }
    // });
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
