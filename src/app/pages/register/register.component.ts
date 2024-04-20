import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { SharedZorroModule } from "../../shared/shared-zorro.module";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [SharedZorroModule, ReactiveFormsModule, FormsModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  formRegister: FormGroup = new FormGroup({});
  showPassword: boolean = false;
  constructor(private fb: FormBuilder, private route: Router) {
    this.formRegister = this.fb.group({
      email: [null, [Validators.required]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  signUp(): void {}

  goRouter(): void {
    this.route.navigate(["login"]);
  }
}
