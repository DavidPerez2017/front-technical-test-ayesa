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
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';

@Component({
  selector: 'clients',
  standalone: true,
  imports: [CommonModule, SharedZorroModule, NgOptimizedImage],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { ngSkipHydration: 'true' },
})
export class ClientsComponent implements OnInit, AfterContentInit {
  array: any = [
    {
      id: '1',
      clients: [
        {
          id: '1.1',
          title: 'Unal',
          urlImage: '/assets/icons/clients/logo-nacional.png',
          style: '',
          class: '',
          products: [
            {
              id: '1',
              icon: '',
              urlImage: '/assets/icons/our-services/aplications.svg',
              text: 'Mobile app for communication processes',
              textEs: 'App móvil para los procesos de la comunicación',
            },
            {
              id: '2',
              icon: '',
              urlImage: '/assets/icons/our-services/websites.svg',
              text: 'Web app for the administration of communication processes',
              textEs:
                'App web para la administración de los procesos de comunicación',
            },
            {
              id: '3',
              icon: '',
              urlImage: '/assets/icons/our-services/websites.svg',
              text: 'Web app for the management of the UNESCO Chair',
              textEs: 'App web para la gestión de la Catedra Unesco',
            },
          ],
        },
        {
          id: '1.3',
          title: 'Doclick',
          urlImage: '/assets/icons/clients/logo-doclick.png',
          class: '',
          style: 'padding: 15px',
          products: [
            {
              id: '1',
              icon: '',
              urlImage: '/assets/icons/our-services/websites.svg',
              text: 'App web para la generación de contratos dinámicos',
              textEs: 'Web app for generating dynamic contracts',
            },
            {
              id: '2',
              icon: '',
              urlImage: '/assets/icons/our-services/consultory.svg',
              text: 'Cloud infrastructure and software maintenance services',
              textEs:
                'Servicios de mantenimiento de software e infraestructura en la nube',
            },
            {
              id: '3',
              icon: '',
              urlImage: '/assets/icons/our-services/consultory.svg',
              text: 'Landing page focused on the service portfolio',
              textEs: 'Landing page enfocada en el portafolio de servicios',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      clients: [
        {
          id: '1.2',
          title: 'Efigas',
          urlImage: '/assets/icons/clients/logo-efigas.png',
          style: '',
          class: '',
          products: [
            {
              id: '1',
              icon: '',
              urlImage: '/assets/icons/our-services/websites.svg',
              text: 'Web app for innovation management',
              textEs: 'App web para la gestión de la innovación',
            },
            {
              id: '2',
              icon: '',
              urlImage: '/assets/icons/our-services/consultory.svg',
              text: 'Cloud software and infrastructure maintenance services',
              textEs:
                'Servicios de mantenimiento de software e infraestructura en la nube',
            },
          ],
        },
        {
          id: '2.1',
          title: 'Unal',
          urlImage: '/assets/icons/clients/logo-sigma.png',
          class: '',
          style: 'padding: 10px',
          products: [
            {
              id: '1',
              icon: '',
              urlImage: '/assets/icons/our-services/websites.svg',
              text: 'Outsourcing Backend services for process management in each of the business lines',
              textEs:
                'Outsourcing servicios Backend para la gestión de procesos en cada una de las líneas de negocio',
            },
          ],
        },
      ],
    },
    {
      id: '3',
      clients: [
        {
          id: '3.1',
          title: 'Grupo Andes',
          urlImage: '/assets/icons/clients/logo-andes.png',
          style: '',
          class: '',
          products: [
            {
              id: '1',
              icon: '',
              urlImage: '/assets/icons/our-services/websites.svg',
              text: 'Landing page focused on the service portfolio',
              textEs: 'Landing page enfocada en el portafolio de servicios',
            },
            {
              id: '2',
              icon: '',
              urlImage: '/assets/icons/our-services/consultory.svg',
              text: 'Cloud management service',
              textEs: 'Servicio de administración en la nube',
            },
            {
              id: '2',
              icon: '',
              urlImage: '/assets/icons/our-services/consultory.svg',
              text: 'Graphic pieces editing service',
              textEs: 'Servicio de edición de piezas gráficas',
            },
          ],
        },
        {
          id: '3.2',
          title: 'Unal',
          urlImage: '/assets/icons/clients/logo-cm-cognitiva.png',
          style: '',
          class: '',
          products: [
            {
              id: '1',
              icon: '',
              urlImage: '/assets/icons/our-services/aplications.svg',
              text: 'Mobile app for management processes',
              textEs: 'App móvil para los procesos de gerencia',
            },
            {
              id: '2',
              icon: '',
              urlImage: '/assets/icons/our-services/consultory.svg',
              text: 'Software maintenance services',
              textEs: 'Servicios de mantenimiento de software',
            },
          ],
        },
      ],
    },
  ];

  @ViewChild('idCarruselClients', { static: false }) idCarruselClients: any;

  private activatedRoute = inject(ActivatedRoute);
  private translate = inject(TranslateService);
  public globalService = inject(GlobalService);
  currentLang = 'en';

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.title.setTitle('TITANQ | Clientes.');
    this.meta.addTag({
      title: 'description',
      content: 'Algunos de nuestros clientes en TITANQ',
    });

    this.meta.addTag({
      title: 'keywords',
      content: 'Clientes TITANQ, our clients TITANQ',
    });
  }

  ngOnInit(): void {
    if (this.globalService.device.isMobile) {
      this.array = this.array.reduce((accumulator: any, currentValue: any) => {
        accumulator.push(currentValue.clients);
        return accumulator;
      }, []);
      this.array = this.array.flat();
    }

    if (isPlatformBrowser(this.platformId)) {
      const fragment = this.activatedRoute.snapshot.fragment;
      if (fragment) {
        try {
          setTimeout(() => {
            if (fragment == 'idClients') {
              this.scroll(null, fragment, true);
            } else {
              this.scroll(null, fragment);
            }
          }, 500);
        } catch (e) {}
      }
    }
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
