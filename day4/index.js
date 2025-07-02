import Rectangle from "./shapes/Rectangle.js";
import Square from "./shapes/Square.js";
import Circle from "./shapes/Circle.js";

const shapes = [new Rectangle(4, 6), new Square(5), new Circle(3)];

shapes.forEach((shape) => {
    console.log(shape.toString());
});
