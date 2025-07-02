// shapes/Square.js
import Shape from "./Shape.js";

export default class Square extends Shape {
    constructor(side) {
        super("Square");
        this.side = side;
    }

    area() {
        return this.side ** 2;
    }

    perimeter() {
        return 4 * this.side;
    }
}
