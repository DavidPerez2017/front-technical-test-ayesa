import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [],
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { ngSkipHydration: "true" },
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {}
}
