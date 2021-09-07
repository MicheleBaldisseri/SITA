import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { BasicElement } from '../model/Basicelements';

@Injectable({
  providedIn: 'root'
})
export class BasicElementsService {

    private apiUrl = environment.mdmUrl + '/MDMService/getAllElements';

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
    
    constructor(private http: HttpClient) {}

    getAllBasicElements(): Observable<BasicElement[]> {
        return this.http.get<BasicElement[]>(this.apiUrl, this.httpOptions);
    }
}
