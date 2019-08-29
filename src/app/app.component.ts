import { Component, ElementRef, OnInit } from '@angular/core';
import { Perceptron } from './neural-net/neural-net';
import { Scene } from './scene/scene';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private ref: ElementRef) { }

  ngOnInit(): void {
    const scene: Scene = new Scene(this.ref);

    const perc: Perceptron = new Perceptron();
    const inputs: number[] = [-1, 0.5];
    const guess: number = perc.guess(inputs);
    console.log('guess', guess);
  }
}
