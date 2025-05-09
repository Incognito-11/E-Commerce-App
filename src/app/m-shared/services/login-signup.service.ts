import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/m-core/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  public login_url="http://localhost:3000";

  public reg_url="http://localhost:3000/user";


  constructor(private http:HttpClient, private apiService:ApiService) { }
  authLogin(user_name:any,password:any):Observable<any>{
    return this.apiService.get(this.login_url+'/user?email='+ user_name+'&password=' +password);
  }
  userRegister(user_dto:any):Observable<any>{
    return this.apiService.post(this.reg_url+'/user',user_dto)
  }

  adminLogin(user_name: any, password: any): Observable<any> {
    return this.apiService.get(`${this.login_url}/user?email=${user_name}&password=${password}&role=admin`);
  }
  

}
