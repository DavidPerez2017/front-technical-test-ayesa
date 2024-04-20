import { Component, inject } from "@angular/core";
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

@Component({
  selector: "app-login",
  standalone: true,
  imports: [SharedZorroModule, ReactiveFormsModule, FormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  host: { ngSkipHydration: "true" },
})
export class LoginComponent {
  formLogin: FormGroup = new FormGroup({});
  showPassword: boolean = false;

  private authService = inject(AuthService);
  public globalService = inject(GlobalService);

  constructor(private fb: FormBuilder, private route: Router) {
    this.formLogin = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  /**
   * @description Method that validates the authentication of a user
   * @param {type} parameter
   * @author David Pérez
   * @date 19/04/2024
   * @returns {type}
   */
  login(): void {
    const data = this.formLogin.getRawValue();
    const user: User = {
      email: "davidperez0219@gmail.com",
      name: "David Pérez Arias",
      password: "",
      isAuthenticate: true,
    };
    const token = "xxx";
    this.authService.setToken(token);
    this.authService.setUser(user);
    this.route.navigate(["/home"]);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("tok", token);
  }

  clickSignUp(): void {
    this.route.navigate(["/register"]);
  }
}
