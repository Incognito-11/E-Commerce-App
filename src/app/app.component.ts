import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  screenHeight: any;
  screenWidth: any;
  footerMaxHeight!: number;
  title = 'EcommerceApp';

  constructor(){
    this.getScreenSize(event)
  }
  @HostListener('window:resize',['$event'])
  getScreenSize(event:any){
    this.screenHeight=window.innerHeight;
    this.screenWidth=window.innerWidth;
    console.log(this.screenHeight, this.screenWidth)
  }

}
