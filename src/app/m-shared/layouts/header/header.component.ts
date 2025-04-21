
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,DoCheck {
  
  logged_in:boolean=false;
  user_role!:any;

  
  constructor(private router:Router){}

  ngOnInit(): void {
    
  }
  ngDoCheck(): void {
    this.user_role=sessionStorage.getItem("role");
    //console.log(this.user_role);
    const user_session_id=sessionStorage.getItem("user_session_id");
    if(user_session_id){
      this.logged_in=true;
    }
  }
  logout(){
    sessionStorage.removeItem("user_session_id");
    sessionStorage.removeItem("role");
    this.router.navigateByUrl("/sign-in");
    location.reload();
  }
  

}
