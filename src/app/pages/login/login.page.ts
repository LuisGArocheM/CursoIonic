import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UIServiceService } from 'src/app/services/uiservice.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', {static:true}) slide : IonSlides



  loginUser = {
    email: 'test1@gmail.com',
    password: '123456'
  };

  registerUser: Usuario = {
    email:'test',
    password:'123456',
    nombre: 'Test',
    avatar: 'av-1.png'
  }

  constructor(private usuarioService:UsuarioService,
    private navCtrl: NavController, private uiService:UIServiceService) { }

  ngOnInit() {

    this.slide.lockSwipes(true)
  }

 async login(fLogin:NgForm){

    if(fLogin.invalid){return;}

   const valido = await this.usuarioService.login(this.loginUser.email,this.loginUser.password)
    console.log(fLogin.valid);
    console.log(this.loginUser);

    if(valido){
        this.navCtrl.navigateRoot('/main/tabs/tab1', {animated:true});
    }else{

      this.uiService.alertaInformativa('Usuario y contraseña no correctos')

    }
    
    
  }

  async registro(fRegistro:NgForm){
    console.log(fRegistro.valid);
    if(fRegistro.invalid){return;}

   const valido = await this.usuarioService.registro(this.registerUser)

    if(valido){
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated:true});
  }else{

    this.uiService.alertaInformativa('Ese correo electronico ya existe')

  }

    
  }



  mostrarRegistro(){

    this.slide.lockSwipes(false);
    this.slide.slideTo(0);
    this.slide.lockSwipes(true);


  }

  mostrarLogin(){

    this.slide.lockSwipes(false);
    this.slide.slideTo(1)
    this.slide.lockSwipes(true);


  }

}
