import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';


declare var window:any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages:string [] = [];
  cargandoGeo = false;

  post= {
     mensaje : '',
     coords:null,
     posicion:false
  };

  constructor(private posts:PostsService,
    private route:Router,
    private geolocation:Geolocation,
    private camera: Camera) {}


  async crearPost(){
    this.post;
    console.log(this.post);
    const creado = await this.posts.crearPost(this.post)
    this.post= {
      mensaje : '',
      coords:null,
      posicion:false
   };

   this.tempImages= [];

   this.route.navigateByUrl('/main/tabs/tab1');

  }

  getGeo(){

    if(!this.post.posicion){
       this.post.coords = null;
       return;
    }

    this.cargandoGeo = true;


    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo = false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      console.log(coords);
      this.post.coords = coords;
      
     }).catch((error) => {
       console.log('Error getting location', error);
       this.cargandoGeo = false;

     });
   
     console.log(this.post);

    
  }

  camara(){
    const options: CameraOptions = {
       quality: 100,
      // destinationType: this.camera.DestinationType.FILE_URI,
      // encodingType: this.camera.EncodingType.JPEG,
      // mediaType: this.camera.MediaType.PICTURE,
      // correctOrientation:true,
      // sourceType: this.camera.PictureSourceType.CAMERA
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA
    };
    
    this.procesarImagen(options);
   
  }


  libreria(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen(options);

  }

  procesarImagen(options:CameraOptions){
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
        
        const img = window.Ionic.WebView.convertFileSrc(imageData);
         
        console.log(img);
        let base64Image = 'data:image/jpeg;base64,' + imageData;


        this.posts.subirImagen(imageData);
        this.tempImages.push(imageData);

        this.posts.subirImagen(img);
        this.tempImages.push(base64Image);

        
     }, (err) => {
         //console.log(err);
         
     });
  }

}
