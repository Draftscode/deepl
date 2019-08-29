
import { v4 as uuid } from 'uuid';
import { Component } from './component';
export class Entity {
  private id: string;
  private counter: number;
  private components: Component[];

  constructor() {
    this.id = uuid();
    this.counter = 0;
  }

  public addComponent(cmp: Component): Entity {
    if (!this.components) { this.components = []; }
    this.components.push(cmp);
    return this;
  }

  public getComponents(): Component[] { return this.components || []; }

  public removeComponent(cmpName: string): Entity {
    this.components = this.components.filter((cmp: Component) => cmp.getName() !== cmpName);
    return this;
  }

  public serialize(): string {
    return JSON.stringify(this);
  }

}
