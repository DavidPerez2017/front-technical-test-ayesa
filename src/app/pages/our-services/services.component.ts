import {
  Component,
  OnInit,
  AfterContentInit,
  ViewChild,
  ViewEncapsulation,
  PLATFORM_ID,
  Inject,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { SharedZorroModule } from '../../shared/shared-zorro.module';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { TitanqUtils } from '../../libraries/utils';
import { GlobalService } from '../../services/global.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'services',
  standalone: true,
  imports: [SharedZorroModule, NgOptimizedImage, CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ServicesComponent implements OnInit, AfterContentInit {
  services = [
    {
      id: '1',
      title: 'Applications',
      titleEs: 'Aplicaciones',
      text: `We develop custom software, web and mobile applications. 
             We seek to provide a technological solution to the needs of each client.`,
      actionText: 'I want information',
      actionTextEs: 'Quiero información',
      textEs: `Desarrollamos software a medida, aplicaciones web y móviles.
              Buscamos brindar una solución tecnológica a las necesidades de cada cliente.`,
      urlImage: '/assets/icons/our-services/aplications.svg',
      messageWhatAsApp:
        'Hola+TITANQ%2C+estoy+interesado+en+una+aplicaci%C3%B3n%F0%9F%91%8C',
      class: '',
    },
    {
      id: '2',
      title: 'Websites',
      titleEs: 'Sitios Web',
      text: `We create web pages to boost business commerce, 
              we combine performance with innovation and aesthetics for each client.`,
      textEs: `Creamos páginas web para impulsar el comercio empresarial,
              Combinamos desempeño con innovación y estética para cada cliente.`,
      actionText: 'I want information',
      actionTextEs: 'Quiero información',
      urlImage: '/assets/icons/our-services/websites.svg',
      messageWhatAsApp:
        'Hola+TITANQ%2C+estoy+interesado+en+un+sitio+web%F0%9F%91%8C',
      class: 'cls-purple',
    },
    {
      id: '3',
      title: 'Consultancy',
      titleEs: 'Consultoría',
      text: `Our strategies are oriented to the objectives of each client.
             We analyze and advise on technological solutions.`,
      textEs: `Nuestras estrategias están orientadas a los objetivos de cada cliente.
             Analizamos y asesoramos en las soluciones tecnológicas que requiere el cliente.`,
      actionText: 'I want information',
      actionTextEs: 'Quiero información',
      urlImage: '/assets/icons/our-services/consultory.svg',
      messageWhatAsApp:
        'Hola+TITANQ%2C+estoy+interesado+en+una+consultor%C3%ADa%F0%9F%91%8C',
      class: 'cls-red',
    },
  ];

  private activatedRoute = inject(ActivatedRoute);
  private translate = inject(TranslateService);
  public globalService = inject(GlobalService);
  currentLang = 'en';

  constructor(
    private router: Router,
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.title.setTitle('TITANQ | Servicios.');
    this.meta.addTag({
      name: 'description',
      content: 'Servicios de software TITANQ',
    });

    this.meta.addTag({
      name: 'keywords',
      content:
        'Aplicaciones web, Aplicaciones móviles, consultoría de software',
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

  goRouter(path: string, id?: string): void {
    // this.closeTimeOut();
    if (id) {
      this.router.navigate([path], { fragment: id });
    } else {
      this.router.navigate([path]);
    }
  }
}
