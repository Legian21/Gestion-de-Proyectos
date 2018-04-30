import {User} from '../../Models/User';
import {MockBackendService} from '../../mock-backend/mock-backend.service';
import {UserService} from '../../services/user.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
  public connection: boolean;
  public username: string;
  public pass: string;
  public id: string;
  public users: User[];
  public user = new User(null, null, null);
  public result;

  constructor(private mockBackendService: MockBackendService, private userService: UserService, private router: Router) {
    if (!this.connection) {
      this.mockBackendService.start();
    }
  }

  ngOnInit() {
    this.getUsers();
  }
  public Validate() {
    console.log(this.users);
    for (let index = 0; index < this.users.length; index++) {
      if (this.users[index].pass === this.pass && this.users[index].username === this.username) {
        this.result = true;
        this.id = this.users[index].id;
      }
    }
    console.log('User: ' + this.username);
    console.log('Pass: ' + this.pass);

    if (this.id != null && this.result) {
      this.users = null;
      this.userService.getUser(this.id)
        .first()
        .subscribe(users => {
          console.log('Users: ' + JSON.stringify(users));
          console.log(users);
          this.users = users;
        });
      if (this.users !== null) {
        this.router.navigate(['mainview']);
      }
    }
  }
  public getUsers() {

    this.userService.getUsers()
      .first()
      .subscribe(users => {
        console.log('Users: ' + JSON.stringify(users));
        console.log(users);
        this.users = users;
      });
  }
}

