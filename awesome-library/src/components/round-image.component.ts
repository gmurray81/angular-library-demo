import { Component, NgModule, OnInit, AfterContentInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-round-image',
  template: `
    <img class="loader" #loader [src]="loadingSrc" (load)="onLoad($event);" />
    <div class="loading"
        ></div>
    <img class="circle" #circle [src]="loadedSrc"
        [class.fadein]="loadedSrc"
        [style.display]="loadedSrc ? 'inline-block' : 'none'" />
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
  img {
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
export class RoundImageComponent implements OnInit, AfterContentInit {

  @Input()
  src: string;

  loadingSrc: string;

  loadedSrc: string;

  onLoad(ev: Event): void {
    this.loadedSrc = this.loadingSrc;

    console.log(ev);
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    window.setTimeout(() => {
    this.loadingSrc = this.src;
    }, 2000);
  }

}

@NgModule({
  declarations: [
    RoundImageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RoundImageComponent
  ]
})
export class RoundImageModule {

}

