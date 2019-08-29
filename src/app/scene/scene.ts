import { ElementRef } from '@angular/core';

export class Scene {
  private ctx: CanvasRenderingContext2D;

  public draw(): void {

  }

  constructor(ref: ElementRef) {
    const canvas: HTMLCanvasElement = document.createElement('canvas');

    canvas.id = 'CursorLayer';
    canvas.width = 200;
    canvas.height = 200;
    canvas.style.zIndex = '8';
    canvas.style.position = 'absolute';
    canvas.style.border = '1px solid';

    ref.nativeElement.appendChild(canvas);

    this.ctx = canvas.getContext('2d');
  }
}
