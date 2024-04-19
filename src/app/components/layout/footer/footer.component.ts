import {
  Component,
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

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [SharedZorroModule, CommonModule],
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { ngSkipHydration: "true" },
})
export class FooterComponent implements OnInit {
  visible: boolean = false;
  canKanban = true;
  canLearned = true;
  canQuick = true;
  canNotes = true;
  currentClient: string = "";
  email = "werepairhouseus@gmail.com";
  //weRe2010#
  public getScreenWidth: any;
  public getScreenHeight: any;

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

  goRouter(path: string): void {
    this.router.navigate([path]);
  }
}
