import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts:Post[]=[];

  habilitado = true;

  constructor(private postService:PostsService) {}


  ngOnInit(){

  
    this.Siguiente();
    this.postService.nuevoPost.
    subscribe(post => {
      this.posts.unshift(post);
    });


  }


  recargar(event){

    this.Siguiente(event,true)
    this.habilitado = true;
    this.posts = [];

  }

  Siguiente(event?, pull:boolean = false ){

  

    this.postService.getPosts(pull).subscribe(res => {
      console.log(res);
      
      this.posts.push(...res.posts);

      if(event){
        event.target.complete();
      }

      if(res.posts.length == 0){
        this.habilitado = false;
      }
      
    });

  }
}
