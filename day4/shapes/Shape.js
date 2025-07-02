// shapes/Shape.js
export default class Shape {
    constructor(name) {
        if (new.target === Shape) {
            throw new Error(
                "Cannot instantiate abstract class Shape directly."
            );
        }

        this.name = name;
    }

    area() {
        throw new Error("Method 'area()' must be implemented.");
    }

    perimeter() {
        throw new Error("Method 'perimeter()' must be implemented.");
    }

    toString() {
        return `${this.name} - Area: ${this.area().toFixed(
            2
        )}, Perimeter: ${this.perimeter().toFixed(2)}`;
    }
}
