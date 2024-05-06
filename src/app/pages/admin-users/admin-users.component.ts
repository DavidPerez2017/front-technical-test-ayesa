import {
  Component,
  OnInit,
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
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { RequestService } from "../../services/request.service";
import { MessageFenix } from "../../libraries/message";
import { DriveService } from "../../services/drive.service";
import { AdminUsersSteps } from "./admin-users-steps";

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
export class AdminUsersComponent implements OnInit {
  listOfData: User[] = [];
  modeEdit = false;
  isSpinning = true;

  trackByIndex(_: number, data: any): number {
    return data.index;
  }

  public globalService = inject(GlobalService);
  public requestService = inject(RequestService);
  public driveService = inject(DriveService);

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private messageFenix: MessageFenix
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getAllUsers();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const infoFirst = localStorage.getItem("admin-users-info");
      if (!infoFirst) {
        this.startInfo();
        localStorage.setItem("admin-users-info", "true");
      }
    }, 500);
  }

  /**
   * @description Method that show info of use of the module
   * @param {type} parameter
   * @author David Pérez
   * @date 19/04/2024
   * @returns {type}
   */
  startInfo(): void {
    this.driveService.startSteps(AdminUsersSteps.getStepsBasicMobile());
  }

  /**
   * @description Method that obtains all system users hosted in the database
   * @param {type} parameter
   * @author David Pérez
   * @date 06/05/2024
   * @returns {type}
   */
  getAllUsers(): void {
    try {
      this.isSpinning = true;
      this.requestService.uRequest("User/getAll", "get").subscribe({
        next: (res) => {
          if (res.response) {
            this.listOfData = res.data;
          } else {
            this.messageFenix.openMessageToastType("error", res.error);
          }
          this.isSpinning = false;
        },
        error: (info) => {
          console.error(info?.error);
          this.isSpinning = false;
        },
      });
    } catch (e) {
      console.error(e);
      this.isSpinning = false;
    }
  }

  /**
   * @description Clic in button edit for start the edition of the user
   * @param {type} parameter
   * @author David Pérez
   * @date 19/04/2024
   * @returns {type}
   */
  startEditUser(event: any, user: any) {
    event.stopPropagation();
    event.preventDefault();
    user["edit"] = true;
    user["namePrevius"] = user["name"];
    this.modeEdit = true;
  }

  /**
   * @description Method that cancels editing a user
   * @param {type} parameter
   * @author David Pérez
   * @date 06/05/2024
   * @returns {type}
   */
  cancelEditUser(user: any) {
    user["edit"] = false;
    user["name"] = user["namePrevius"];
    this.updateModeEdition();
  }

  /**
   * @description Clic in button edit for the edition of the user
   * @param {type} parameter
   * @author David Pérez
   * @date 19/04/2024
   * @returns {type}
   */
  deleteUser(user: any, index: number) {
    try {
      this.isSpinning = true;
      this.requestService
        .uRequest(`User/delUser/${user.email}`, "delete")
        .subscribe({
          next: (res) => {
            if (res.response) {
              this.listOfData.splice(index, 1);
              this.listOfData = JSON.parse(JSON.stringify(this.listOfData));
            } else {
              this.messageFenix.openMessageToastType("error", res.error);
            }
            this.isSpinning = false;
          },
          error: (info) => {
            console.error(info?.error);
            this.isSpinning = false;
          },
        });
    } catch (e) {
      console.error(e);
      this.isSpinning = false;
    }
  }

  /**
   * @description Method that sends the name of a user for update
   * @param {type} parameter
   * @author David Pérez
   * @date 06/05/2024
   * @returns {type}
   */
  updateName(user: any) {
    try {
      user["edit"] = false;
      this.isSpinning = true;
      this.requestService
        .uRequest(`User/editUser/${user.email}`, "patch", user)
        .subscribe({
          next: (res) => {
            if (res.response) {
              this.updateModeEdition();
            } else {
              this.messageFenix.openMessageToastType("error", res.error);
              user["name"] = user["namePrevius"];
            }
            this.isSpinning = false;
          },
          error: (info) => {
            console.error(info?.error);
            this.isSpinning = false;
          },
        });
    } catch (e) {
      console.error(e);
      this.isSpinning = false;
    }
  }

  /**
   * @description Method that triggers editing of a user's name
   * @param {type} parameter
   * @author David Pérez
   * @date 06/05/2024
   * @returns {type}
   */
  updateModeEdition(): void {
    for (const user of this.listOfData) {
      if (user["edit"]) {
        this.modeEdit = true;
        return;
      }
    }
    this.modeEdit = false;
  }
}

interface User {
  email: string;
  name: string;
  edit: boolean;
}
