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
import { md5 } from "../../libraries/md5";
import { AuthService, User } from "../../services/auth.service";
import { GlobalService } from "../../services/global.service";
import { RequestService } from "../../services/request.service";
import { MessageFenix } from "../../libraries/message";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [SharedZorroModule, ReactiveFormsModule, FormsModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent implements OnDestroy {
  formRegister: FormGroup = new FormGroup({});
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
    this.formRegister = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
          ),
        ],
      ],
      name: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
    this.globalService.layoutType = "full";
  }

  ngOnDestroy(): void {
    this.globalService.layoutType = "main";
  }

  /**
   * @description Method to register a new user in the system
   * @param {type} parameter
   * @author David Pérez
   * @date 19/04/2024
   * @returns {type}
   */
  signUp(): void {
    try {
      this.isSpinning = true;
      const data = this.formRegister.getRawValue();
      data["password"] = md5(data["password"]);
      this.requestService.uRequest("Auth/signUp", "post", data).subscribe({
        next: (res) => {
          if (res.response) {
            if (!res?.data?.token) {
              this.messageFenix.openMessageToastType(
                "error",
                "Lo sentimos, no se ha generado el token de la cuenta"
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
          this.messageFenix.openMessageToastType(
            "error",
            "Ocurrió un error comunícate con el administrador de este sitio"
          );
          this.isSpinning = false;
        },
      });
    } catch (exc) {
      console.error(exc);
      this.messageFenix.openMessageToastType(
        "error",
        "Ocurrió un error comunícate con el administrador de este sitio"
      );
      this.isSpinning = false;
    }
  }

  /**
   * @description Method that directs to the login page
   * @param {type} parameter
   * @author David Pérez
   * @date 06/05/2024
   * @returns {type}
   */
  goRouter(): void {
    this.route.navigate(["login"]);
  }
}
