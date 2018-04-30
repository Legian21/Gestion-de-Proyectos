import {User} from '../Models/User';
import {UserService} from './user.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class LogInService {
  public users: User[];
  public user: User;
  public id: string;
  public result;
  constructor(private userService: UserService) {}


  public doLogin(username: string, pass: string): User {
    this.getUsers();
    for (let index = 0; index < this.users.length; index++) {
      if (this.users[index].pass === pass && this.users[index].username === username) {
        this.result = true;
        this.id = this.users[index].id;
      }
    }
    console.log('User: ' + username);
    console.log('Pass: ' + pass);

    if (this.id != null && this.result) {
      this.users = null;
      this.userService.getUser(this.id)
        .first()
        .subscribe(user => {
          console.log('User: ' + JSON.stringify(user));
          console.log(user);
          this.user = user[0];
        });
     this.userService.user = this.user;
    }
    return this.user;
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
