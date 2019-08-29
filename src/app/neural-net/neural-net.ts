
export class Perceptron {
  private weights: number[];

  constructor() {
    this.weights = new Array<number>(2);

    // init weights randomly
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = Math.floor(Math.random() * 1) - 1;
    }
  }

  public guess(inputs: number[]): number {
    const sum = this.weights
      .reduce((accu: number, currentWeight: number, index: number) =>
        accu + (inputs[index] * currentWeight));

    return this.sign(sum);
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
