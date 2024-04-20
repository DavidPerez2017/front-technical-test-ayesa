import {
  Component,
  OnInit,
  AfterContentInit,
  ViewEncapsulation,
  PLATFORM_ID,
  Inject,
  inject,
} from "@angular/core";
import { SharedZorroModule } from "../../shared/shared-zorro.module";
import {
  CommonModule,
  NgOptimizedImage,
  isPlatformBrowser,
} from "@angular/common";
import { GlobalService } from "../../services/global.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "admin-users",
  standalone: true,
  imports: [
    SharedZorroModule,
    NgOptimizedImage,
    TranslateModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: "./admin-users.component.html",
  styleUrls: ["./admin-users.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { ngSkipHydration: "true" },
})
export class AdminUsersComponent implements OnInit, AfterContentInit {
  private translate = inject(TranslateService);
  public globalService = inject(GlobalService);

  listOfData: any = [
    {
      email: "david@gmail.com",
      name: "John Brown",
    },
    {
      email: "pedro@gmail.com",
      name: "Jim Green",
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
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

  startEditUser(user: any) {
    user["edit"] = true;
  }

  deleteUser(user: any) {}

  updateName(user: any) {
    user["edit"] = false;
  }
}
