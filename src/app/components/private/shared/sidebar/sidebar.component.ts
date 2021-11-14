import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public isLoggedAdmin!:Boolean;
  public isLoggedClient!:Boolean

 constructor(private userService:UserService) { }

 ngOnInit(): void {
   this.isLoggedAdmin = this.userService.isLoggedAdmin();
   this.isLoggedClient = this.userService.isLoggedClient()
 }

}
