import { Injectable } from "@angular/core";

// https://driverjs.com/docs/
import { driver } from "driver.js";

@Injectable({
  providedIn: "root",
})
export class DriveService {
  driver: any;

  constructor() {
    this.driver = driver();
  }

  start(idElement: string, title: string, description: string) {
    this.driver.highlight({
      element: idElement,
      popover: {
        title,
        description,
      },
    });
  }

  startSteps(steps: StepTour[], showButtons?: any[]): void {
    const buttons = showButtons ? showButtons : ["next", "previous", "close"];

    const stepsNew = steps.map((item) => {
      return {
        element: item.element,
        popover: { title: item.title, description: item.description },
      };
    });
    this.driver = driver({
      showButtons: buttons,
      nextBtnText: "Siguiente",
      prevBtnText: "Anterior",
      doneBtnText: "Fin",
      showProgress: true,
      steps: stepsNew,
    });
    this.driver.drive();
  }

  close(): void {
    this.driver.moveTo(-1);
  }

  nextStep(): void {
    this.driver.moveNext();
  }

  previusStep(): void {
    this.driver.movePrevious();
  }

  toStep(index: number): void {
    this.driver.moveTo(index);
  }
}

export interface StepTour {
  element: string;
  title: string;
  description: string;
}

export interface DriveInterface {
  start(): void;
}
