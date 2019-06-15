import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  private data: any;
  
  constructor(private http: HttpClient) { }

  public setData(data) { this.data = data }

  getData() { return this.data }
  login(password,email){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'password': password,
        'app': 'APP_BCK'
        
      })
    };
  
    return this.http.put(`https://dev.tuten.cl/TutenREST/rest/user/${email}`,null,httpOptions)
  }

}
