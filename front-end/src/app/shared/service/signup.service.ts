import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private userUrl = environment.userUrl + '/UserService/signUp';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  signup(data: Object): Observable<User> {
    return this.http.post<User>(this.userUrl, data, this.httpOptions);
  }
}
