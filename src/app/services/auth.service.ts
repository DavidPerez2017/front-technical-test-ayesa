import { Injectable, inject } from "@angular/core";
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
  constructor(private route: Router) {}

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
    localStorage.clear();
    this.setToken("");
    this.setUser(null);
    this.route.navigate(["login"]);
  }
}

export interface User {
  email: string;
  name: string;
  password: string;
  isAuthenticate: boolean;
}
