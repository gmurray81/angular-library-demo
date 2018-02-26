import { Component, NgModule, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-image',
  template: `
    <img class="loader" #loader [src]="loadingSrc" (load)="onLoad($event);" />
    <div class="loading"
        ></div>
    <canvas class="canvas" #canvas 
        [class.fadein]="loadedSrc"
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
  .canvas {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
  .loader {
    display: none;
  }
  .fadein {
    animation-duration: 2s;
    animation-name: fadein;
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  
  `]
})
export class StarImageComponent implements OnInit, AfterViewInit {

  
  @Input()
  src: string;

  @ViewChild("canvas")
  private _canvas: ElementRef;

  @ViewChild("loader")
  private _img: ElementRef;

  loadingSrc: string;

  loadedSrc: string;

  onLoad(ev: Event): void {
    this.loadedSrc = this.loadingSrc;

    let canvas: HTMLCanvasElement = this._canvas.nativeElement;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;

    let ctx = canvas.getContext("2d");
    ctx.save();
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    this.drawStar(ctx, width / 2.0, height / 2.0, 
      Math.min(width / 2.0, height / 2.0),
       .98, .6);

    ctx.clip();

    ctx.drawImage(this._img.nativeElement, 0,0, width, height);

    ctx.restore();
    ctx.save();
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    ctx.strokeStyle = "lightGray";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5.0;
    
    this.drawStar(ctx, width / 2.0, height / 2.0, 
      Math.min(width / 2.0, height / 2.0),
       .98, .6);

    ctx.stroke();

    ctx.restore();

    console.log(ev);
  }

  drawStar(ctx: CanvasRenderingContext2D, x: number,
       y: number, radius: number, outerExtent: number, innerExtent: number): any {
    ctx.beginPath();

    let out = true;
    let first = true;
    for (let i = 0; i <= 2 * Math.PI; i += Math.PI / 5.0) {
      let currAngle = i - Math.PI / 2.0;
      let currX = 0;
      let currY = 0;

      let r = radius * innerExtent;
      if (out) {
        r = radius * outerExtent;
      }
      out = !out;

      currX = x + r * Math.cos(currAngle);
      currY = y + r * Math.sin(currAngle);

      if (first) {
        first = false;
        //console.log("M" + x + "," + y);
        ctx.moveTo(currX, currY);
      } else {
        //console.log("L" + x + "," + y);
        ctx.lineTo(currX, currY);
      }
    }

    ctx.closePath();
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    window.setTimeout(() => {
    this.loadingSrc = this.src;
    }, 2000);
  }

}

@NgModule({
  declarations: [
    StarImageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StarImageComponent
  ]
})
export class StarImageModule {

}

