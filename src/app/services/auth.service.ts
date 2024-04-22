import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID, inject } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private user: User | null = {
    email: "",
    name: "",
    password: "",
    isAuthenticate: false,
  };
  private token: string = "";
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private route: Router
  ) {}

  public getUser(): User | null {
    return this.user;
  }

  public getToken(): string {
    return this.token;
  }

  public setUser(user: User | null): void {
    this.user = user;
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public logout(): void {
    if (isPlatformBrowser(this.platformId) && localStorage) {
      localStorage.clear();
      this.setToken("");
      this.setUser(null);
      this.route.navigate(["login"]);
    }
  }

  public autoLogin(user: User, token: string): void {
    this.setToken(token);
    this.setUser(user);
    this.route.navigate(["/home"]);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("tok", token);
  }
}

export interface User {
  email: string;
  name: string;
  password: string;
  isAuthenticate: boolean;
}
