import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { UIServiceService } from 'src/app/services/uiservice.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};

  constructor(private usuarioService:UsuarioService,
    private uiService:UIServiceService,
    private postService:PostsService) {}
  
  ngOnInit(){
    this.usuario = this.usuarioService.getUsuario();

  }

 async actualizar(fActualizar:NgForm){
    if(fActualizar.invalid){return}

    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario)
  
      if(actualizado){
         this.uiService.presentToast('Actualizado correctamente');
      }else{
        this.uiService.presentToast('Ocurrio un problema')

      }
  }


  logout(){


   this.postService.paginaPost = 0;
    this.usuarioService.logout();

  }

}


