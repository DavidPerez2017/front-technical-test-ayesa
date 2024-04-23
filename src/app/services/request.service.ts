import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RequestService {
  constructor(private http: HttpClient) {}

  uRequest(
    url: string,
    type: string,
    data?: any,
    response?: any
  ): Observable<any> {
    let path = environment.webServices.urlRequest;

    const token = localStorage.getItem("tok");

    const config = {
      headers: {
        Authorization: `Bearer ${token?.replace(/"/g, "")}`,
      },
      body: type === "delete" ? data : "",
      responseType: response,
    };

    try {
      //HTTP GET Request
      if (type == "get") {
        data ? config : delete config["body"];
        return this.http.get(path + url, config);
      }

      //HTTP POST Request
      else if (type == "post") {
        return this.http.post(path + url, data, config);
      }

      //HTTP PUT Request
      else if (type == "patch") {
        return this.http.patch(path + url, data, config);
      }

      //HTTP DELETE Request
      else if (type == "delete") {
        return this.http.delete(path + url, config);
      } else if (type == "deleteBody") {
        config["body"] = data;
        return this.http.delete(path + url, config);
      }

      return new Observable();
    } catch (error: any) {
      return error;
    }
  }

  uRequestRegister(data: any): Observable<any> {
    const env_url = environment.webServices.urlRequest;
    return this.http.post(env_url + "user", data);
  }
}

export interface User {
  email: string;
  password: string;
  authenticate: boolean;
}
