import { Component, OnDestroy, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { SharedZorroModule } from "../../shared/shared-zorro.module";
import { Router } from "@angular/router";
import { AuthService, User } from "../../services/auth.service";
import { GlobalService } from "../../services/global.service";
import { RequestService } from "../../services/request.service";
import { MessageFenix } from "../../libraries/message";
import { md5 } from "../../libraries/md5";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [SharedZorroModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  host: { ngSkipHydration: "true" },
})
export class LoginComponent implements OnDestroy {
  formLogin: FormGroup = new FormGroup({});
  showPassword: boolean = false;
  isSpinning: boolean = false;
  private authService = inject(AuthService);
  public globalService = inject(GlobalService);
  public requestService = inject(RequestService);

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private messageFenix: MessageFenix
  ) {
    this.formLogin = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
          ),
        ],
      ],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
    this.globalService.layoutType = "full";
  }

  ngOnDestroy(): void {
    this.globalService.layoutType = "main";
  }

  /**
   * @description Method that validates the authentication of a user
   * @param {type} parameter
   * @author David Pérez
   * @date 19/04/2024
   * @returns {type}
   */
  login(): void {
    try {
      if (!this.formLogin.valid) {
        return;
      }

      this.isSpinning = true;
      const data = this.formLogin.getRawValue();
      data["password"] = md5(data["password"]);
      this.requestService.uRequest("Auth/login", "post", data).subscribe({
        next: (res) => {
          if (res.response) {
            if (!res?.data?.token) {
              this.messageFenix.openMessageToastType(
                "error",
                "Lo sentimos, no se ha generado la sesión"
              );
            }
            const user: User = {
              email: data.email,
              name: data.name,
              password: "",
              isAuthenticate: true,
            };
            this.authService.autoLogin(user, res.data.token);
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
    } catch (exc) {
      console.error(exc);
      this.isSpinning = false;
    }
  }

  clickSignUp(): void {
    this.route.navigate(["/register"]);
  }
}
