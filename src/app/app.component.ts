import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'CompagnWebApp';
  
  constructor(private router : Router){}

  public isConnected ;

  ngOnInit(): void {
   this.isConnected = true;
  }

  logout(){
    this.isConnected = false;
    this.router.navigateByUrl('login');    
  }

  
}
