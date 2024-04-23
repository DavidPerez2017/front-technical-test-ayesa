import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { DeviceDetectorService } from "ngx-device-detector";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  subjectLanguage: Subject<any> = new BehaviorSubject("en");
  isSpinning = false;
  device = {
    isMobile: false,
    isPhone: false,
    isTablet: false,
    isDesktop: false,
  };

  currentRoute = "";
  layoutType: "full" | "main" = "main";

  public deviceService = inject(DeviceDetectorService);

  constructor() {
    if (this.deviceService.isDesktop()) {
      this.device.isMobile = false;
      this.device.isTablet = false;
      this.device.isPhone = false;
      this.device.isDesktop = true;
    } else if (this.deviceService.isMobile()) {
      this.device.isMobile = true;
      this.device.isPhone = true;
      this.device.isTablet = false;
      this.device.isDesktop = false;
    }

    if (this.deviceService.isTablet()) {
      this.device.isMobile = true;
      this.device.isTablet = true;
      this.device.isPhone = false;
      this.device.isDesktop = false;
    }
  }

  toggleSpinner(state: boolean): void {
    if (state) {
      this.isSpinning = state;
    } else {
      setTimeout(() => {
        this.isSpinning = state;
      }, 800);
    }
  }
}
