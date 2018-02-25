import { Component, NgModule, OnInit, Input, Renderer2, ElementRef, ViewChild, AfterContentInit, NgZone } from '@angular/core';
import { Scene } from './Scene';
import { ClipRegions } from './ClipRegion'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-awesome-image',
  template: `
  <img class="loader" #img [src]="loadingSrc" (load)="onLoad()" />
  <div class="loading"
      ></div>
  <canvas class="circle" #canvas
    ></canvas>
`,
styles: [`
:host {
  display: inline-block;
  position: relative;
}
.loading {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: gray;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
canvas {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.loader {
  display: none;
}
`]
})
export class AwesomeImageComponent implements AfterContentInit {

  @ViewChild("canvas")
  canvas: ElementRef; 

  @ViewChild("img")
  img: ElementRef; 

  constructor(private _renderer: Renderer2, private _ngZone: NgZone) {

  }

  @Input()
  src: string;

  loadingSrc: string;

  loadedSrc: string;

  ngAfterContentInit() {
    this.loadingSrc = this.src;
  }

  private _scene: Scene;
  private _context: CanvasRenderingContext2D;
  private _clipRegions: ClipRegions;
  onLoad() {
    this.loadedSrc = this.loadingSrc;
    let canvasWidth = +this.canvas.nativeElement.clientWidth;
    let canvasHeight = +this.canvas.nativeElement.clientHeight;
    
    this.buildClipRegions(canvasWidth, canvasHeight, 4000);

    this._scene = new Scene(
      this.canvas.nativeElement,
      this.canvas.nativeElement.clientWidth,
      this.canvas.nativeElement.clientHeight,
      window.devicePixelRatio,
      (act) => this._ngZone.runOutsideAngular(() => {
        window.requestAnimationFrame(act); 
      }), 
      this._clipRegions,
      this.img.nativeElement);
    
    this._scene.startTicking();
  }

  buildClipRegions(width: number, height: number, duration: number) {
    this._clipRegions = new ClipRegions();
    let rad = width / 15;
    let maxDelay = duration * .25;
    let minDuration = duration * .5;
    for (var i = 0; i < width; i += width / 15) {
      for (var j = 0; j < height; j += width / 15) {
        let currDelay = Math.random() * maxDelay;
        let currDuration = minDuration + ((duration - minDuration) - currDelay) * Math.random();
        this._clipRegions.addRegion(
          i, j, rad, currDuration, currDelay
        );
      }
    }
  }



}

@NgModule({
  declarations: [
    AwesomeImageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AwesomeImageComponent
  ]
})
export class AwesomeImageModule {

}
