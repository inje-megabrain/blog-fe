export default class Stack<T> {
  private _values: T[];

  constructor() {
    this._values = [];
  }

  indexOf(value: T) {
    return this._values.indexOf(value);
  }

  popTo(value: T) {
    const idx = this._values.indexOf(value);

    const out = this._values.slice(idx + 1);

    this._values = this._values.slice(0, idx + 1);

    return out;
  }

  delete(value: T) {
    return this._values.splice(this._values.indexOf(value), 1);
  }

  push(value: T) {
    this._values.push(value);
  }

  get values() {
    return this._values;
  }

  get size() {
    return this._values.length;
  }

  forEach(callback: any) {
    this._values.forEach(callback);
  }

  map(callback: any) {
    return this._values.map(callback);
  }

  clear(callback?: (element: T) => void) {
    if (callback) this.forEach(callback);
    this._values = [];
  }
}
