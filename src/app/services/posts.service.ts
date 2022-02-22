import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:HttpClient,
    private usuarioService:UsuarioService,
    private fileTransfer:FileTransfer) { }
 
  paginaPost = 0;
  nuevoPost = new EventEmitter<Post>();



  getPosts( pull:boolean = false ){

    if(pull){
      this.paginaPost = 0;
    }

    this.paginaPost ++;

    return this.http.get<RespuestaPosts>(`${URL}/posts?pagina=${this.paginaPost}`);
  }

  crearPost(post){
     const headers = new HttpHeaders({
       'x-token': this.usuarioService.token

     });

     return new Promise(resolve => {
      
      this.http.post(`${URL}/posts`,post, {headers}).
     subscribe(res => {
       console.log(res);
       this.nuevoPost.emit(res['post'])
         resolve(true)
        })
     })

     
  }

  subirImagen(img:string){

    const options:FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.usuarioService.token
      }

    };

    const fileTransfer:FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(img, `${URL}/posts/upload`, options).
    then(data => {
      console.log(data);
      
    }).catch(err => {
      console.log('error en carga',err);
      
    })


  }
}
