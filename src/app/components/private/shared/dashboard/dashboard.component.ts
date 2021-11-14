import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor( private route: ActivatedRoute, private userService: UserService,) { }

  ngOnInit(): void {

    let idUser = this.route.snapshot.params._id;
    this.userService.getOneUser(idUser).subscribe(
      res => {
        let user = res;
   

      },
      err => {
        console.log(err);

      }
    )
  }

}
