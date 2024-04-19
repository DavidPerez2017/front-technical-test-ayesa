import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { DeviceDetectorService } from "ngx-device-detector";
import { environment } from "../../environments/environment";

declare var gtag: Function;

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  subjectLanguage: Subject<any> = new BehaviorSubject("en");
  subjectSound: Subject<any> = new BehaviorSubject("");

  isSpinning = false;
  device = {
    isMobile: false,
    isPhone: false,
    isTablet: false,
    isDesktop: false,
  };

  system = "titanq";
  currentRoute = "";

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

  // use gtag.js to send Google Analytics Events
  public eventGoogleAnalytics(
    action: string,
    eventCategory?: string,
    eventLabel?: string,
    value?: string
  ) {
    if (environment.production) {
      gtag("event", action, {
        ...(eventCategory && { event_category: eventCategory }),
        ...(eventLabel && { event_label: eventLabel }),
        ...(value && { value: value }),
      });
    }
  }
}
