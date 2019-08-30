
export class Perceptron {
  private weights: number[];
  private lr = 0.1; // learning rate

  constructor() {
    this.weights = new Array<number>(2);

    // init weights randomly
    for (let i = 0; i < this.weights.length; i++) {
      const rand: number = Math.floor(Math.random() * 200);
      this.weights[i] = rand > 100 ? (rand * -1) / 100 : rand / 100;
    }
  }

  public guess(inputs: number[]): number {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }

    return this.sign(sum);
  }

  public train(inputs: number[], target: number) {
    const guess: number = this.guess(inputs);
    const error: number = target - guess;

    // tune weights
    for (let i = 0; i < this.weights.length; i++) {
      // gradient descent
      this.weights[i] += error * inputs[i] * this.lr;
    }
  }


  /**
   * activation function -> feed forward
   * @param value number
   * @returns number
   */
  private sign(value: number): number {
    return value >= 0 ? 1 : -1;
  }
}
