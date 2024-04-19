import {
  Component,
  OnInit,
  AfterContentInit,
  ViewEncapsulation,
  PLATFORM_ID,
  Inject,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { SharedZorroModule } from '../../shared/shared-zorro.module';
import { isPlatformBrowser } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { TitanqUtils } from '../../libraries/utils';
import { GlobalService } from '../../services/global.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'fenix',
  standalone: true,
  imports: [SharedZorroModule, NgOptimizedImage],
  templateUrl: './fenix.component.html',
  styleUrls: ['./fenix.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FenixComponent implements OnInit, AfterContentInit {
  private activatedRoute = inject(ActivatedRoute);
  private translate = inject(TranslateService);

  currentLang = 'en';

  itemsFenixErp = [
    {
      id: '1',
      title: 'Engineering',
      titleEs: 'Ingeniería',
      urlImage: '/assets/icons/fenix/engineering.png',
      class: '',
    },
    {
      id: '2',
      title: 'Human Resources',
      titleEs: 'Recursos humanos',
      urlImage: '/assets/icons/fenix/rrhh.png',
      class: '',
    },
    {
      id: '3',
      title: 'Marketing planning',
      titleEs: 'Marketing',
      urlImage: '/assets/icons/fenix/marketing.png',
      class: '',
    },
    {
      id: '4',
      title: 'Productivity',
      titleEs: 'Productividad',
      urlImage: '/assets/icons/fenix/list.png',
      class: '',
    },
  ];

  itemsFenixPos = [
    {
      id: '1',
      title: 'POS Billing',
      titleEs: 'Facturación POS',
      urlImage: '/assets/icons/fenix/bill.png',
      class: 'cls-purple',
    },
    {
      id: '2',
      title: 'Digital letter',
      titleEs: 'Carta digital',
      urlImage: '/assets/icons/fenix/menu-digital.png',
      class: 'cls-purple',
    },
    {
      id: '3',
      title: 'Inventory',
      titleEs: 'Inventario',
      urlImage: '/assets/icons/fenix/inventory.png',
      class: 'cls-purple',
    },
    {
      id: '4',
      title: 'Bookings',
      titleEs: 'Reservas',
      urlImage: '/assets/icons/fenix/reservation.png',
      class: 'cls-purple',
    },
  ];

  public globalService = inject(GlobalService);

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.title.setTitle('TITANQ | Fenix.');
    this.meta.addTag({
      name: 'description',
      content: 'Software erp y facturación pos',
    });

    this.meta.addTag({
      name: 'keywords',
      content: 'Nuestros productos, Software erp, Software pos',
    });
  }

  ngOnInit(): void {}

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

  openNewTab(url: string): void {
    // https://fenixerp.com.co/
    if (isPlatformBrowser(this.platformId)) {
      // window?.open(url, '_blank').focus();
    }
  }
}
