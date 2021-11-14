import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../../../services/user.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  userList: any[] = []

  constructor(private userService: UserService,) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      result => {
        this.userList = result;
      },
      error => {
        console.log(error);

      }
    )
  }

  delete(person: any) {
    let index = this.userList.indexOf(person);
    this.userList.splice(index, 1);
    this.userService.deleteUser(person._id).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);

      }
    )
  }

}

