import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImagenPipePipe } from './imagen-pipe.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImagenPipePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DomSanitizerPipe,
    ImagenPipePipe
  ]
})
export class PipesModule { }
