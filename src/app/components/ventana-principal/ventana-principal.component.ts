import { User } from '../../Models/User';
import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventana-principal',
  templateUrl: './ventana-principal.component.html',
  styleUrls: ['./ventana-principal.component.css']
})
export class VentanaPrincipalComponent implements OnInit {
  private actualUser: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.actualUser = this.userService.user;
    console.log('Logueado como:', this.actualUser);
  }
  
}
