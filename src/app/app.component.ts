import { Component, ElementRef, OnInit } from '@angular/core';
import { Game } from '@app/game/game';
import { PositionComponent } from '@ecs/components/position.component';
import { RenderComponent, RenderType } from '@ecs/components/render.component';
import { Entity } from '@ecs/core/entity';
import { RenderSystem } from '@ecs/systems/render.system';
import { Perceptron } from '@nn/neural-net';
import { Point2D } from './game/point';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private width: number;
  private height: number;
  private brain: Perceptron;
  private game: Game;

  constructor(private ref: ElementRef) {
    this.width = this.height = 400;
  }

  ngOnInit(): void {
    this.game = new Game(this.ref);
    this.game.setSize(this.width, this.height);

    this.brain = new Perceptron();

    for (let i = 0; i < 1000; i++) {
      const x: number = Math.floor(Math.random() * this.width) + 0;
      const y: number = Math.floor(Math.random() * this.height) + 0;
      this.game.ecs.createEntity(new PositionComponent(new Point2D(x, y)), new RenderComponent('grey', 'grey', RenderType.POINT));
    }

    this.game.ecs.addSystem(new RenderSystem());
    this.train(true)

  }

  train(skip?: boolean) {
    const start: number = Math.floor(Math.random() * this.game.ecs.getEntities().length - 10) + 0;
    this.game.ecs.getEntities().filter((entity: Entity) => entity.hasComponents('PositionComponent', 'RenderComponent'))
      .forEach((entity: Entity, index: number) => {
        const pos: PositionComponent = entity.getComponent('PositionComponent') as PositionComponent;
        const renderer: RenderComponent = entity.getComponent('RenderComponent') as RenderComponent;
        const target: number = pos.getPosition().getX() > pos.getPosition().getY() ? 1 : -1;

        if (!skip) {
          if (index >= start && index <= start + 3) {
            this.brain.train([pos.getPosition().getX(), pos.getPosition().getY()], target);
          }
        }

        const guess: number = this.brain.guess([pos.getPosition().getX(), pos.getPosition().getY()]);
        if (guess === target) {
          renderer.borderColor = 'green';
        } else {
          renderer.borderColor = 'red';
        }
      });

  }
}
