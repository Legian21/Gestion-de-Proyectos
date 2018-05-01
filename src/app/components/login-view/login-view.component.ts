import {User} from '../../Models/User';
import {MockBackendService} from '../../mock-backend/mock-backend.service';
import {LogInService} from '../../services/log-in.service';
import {UserService} from '../../services/user.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
  //  public connection: boolean;
  public username: string;
  public pass: string;
  public users: User[];
  public user: User;
  public result;

  constructor(private mockBackendService: MockBackendService, private loginService: LogInService, private router: Router) {

    this.mockBackendService.start();
    this.result = true;
  }

  ngOnInit() {
  }
  public validate() {
    this.user = this.loginService.doLogin(this.username, this.pass);
    console.log(this.user);
    if (this.user != null) {
    this.result = true;
      this.router.navigate(['mainview']);
    }else{
      this.result = false;
      this.pass = null;
    }
  }
}

