import { Component, OnInit } from '@angular/core';
import { UserDetailService } from '../../services/user-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email;
  password;
  token:any;
  constructor(private api: UserDetailService,private router: Router) { }

  ngOnInit() {
  }

  autenticar(){
    this.api.login(this.password, this.email).subscribe(response=>{
      this.token = response;
      if(this.token != null){
        
        localStorage.setItem('token', this.token.sessionTokenBck)
        localStorage.setItem('email', this.email)
        console.log("El token ha sido guardado exitosamente")
        this.router.navigateByUrl('home')
      }

    },err=>{

      console.log("¡Ocurrió un error inesperado!", err)

    })
  }
}
