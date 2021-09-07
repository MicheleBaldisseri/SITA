import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Kpi } from '../model/Kpi';

@Injectable({
  providedIn: 'root'
})
export class KpiService {

    private kpiUrl = environment.kpiUrl + '/KpiService/formulaKpi';

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
    
      constructor(private http: HttpClient) {}
    
      getAllKpi(): Observable<Kpi[]> {
        //DA TOGLIERE l'aggiunta dell'example per stoplight
        return this.http.get<Kpi[]>(this.kpiUrl, this.httpOptions); // + '?__example=example1'
      }
    
      addKpi(kpi: Kpi): Observable<Kpi> {
        return this.http.post<Kpi>(this.kpiUrl, kpi);
      }
    
      updateKpi(kpi: Kpi): Observable<Kpi> {
        return this.http.put<Kpi>(this.kpiUrl, kpi);
      }

      deleteKpi(kpi: Kpi): Observable<Kpi> {

        let name = new HttpParams();
        name = name.append('name', kpi.name);

        let httpOptionsDel = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            params: name
          };

        return this.http.delete<Kpi>(this.kpiUrl, httpOptionsDel);
      }
}
