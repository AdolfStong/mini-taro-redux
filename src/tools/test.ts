/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Shentong
 * @Date: 2020-10-14 20:04:07
 * @LastEditors: Shentong
 * @LastEditTime: 2020-10-20 18:22:23
 */
// TODO: enum
//  enum Directions {
//     Up,
//     Down,
//     Left,
//     Right
// }

// let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
// console.log(directions)
// enum E {
//     X, Y, Z
// }
// function f(obj: { X: number }) {
//     console.log(obj.X)
//     return obj.X;
// }

// f(E);
// TODO: function
// let myAdd: (baseValue: number, increment: number) => number =
//     function(x, y) { return x + y; };
 // TODO: clusour
//  function outer() {
//      let i = 1;
//      return function () {
//          console.log(i++)
//      }
//  }

//  const clusour = outer ()

//  clusour () 
//  clusour ()
//  clusour ()
//  clusour ()
//  clusour ()

// TODO: secret passcode
// class Employee {
//   private _fullName: string;
//   private _passcode: string;

//   constructor(passcode: string) {
//     this._passcode = passcode;
//   }

//   get fullName(): string {
//     console.log("fullName get");
//     return this._fullName;
//   }

//   set fullName(newName: string) {
//     console.log("fullName set", this._passcode);
//     if (this._passcode && this._passcode == "secret passcode") {
//       this._fullName = newName;
//     } else {
//       console.log(`Unauthorized update of employee called ${this._passcode}`);
//     }
//   }
// }

// let employee = new Employee("111");
// employee.fullName = "secret passcode";
// console.log("employee", employee);
// if (employee.fullName) {
//   console.log(employee.fullName);
// }
// TODO:
// class Employee {
//   fullName: string;
// }

// let employee = new Employee();
// console.log(employee, "111");
// DEMO TODO:
// class Octopus {
//   readonly name: string;
//   readonly numberOfLegs: number = 8;
//   constructor(theName: string) {
//     this.name = theName;
//   }
// }
// let dad = new Octopus("Man with the 8 strong legs");
// console.log(dad.name, "dad");
// dad.name = "hhh";
// DEMO TODO:
// class Animal {
//   name: string;
//   constructor(theName: string) {
//     this.name = theName;
//   }
//   move(distanceInMeters: number = 0) {
//     console.log(`${this.name} moved ${distanceInMeters}m.`);
//   }
// }

// class Snake extends Animal {
//   constructor(name: string) {
//     super(name);
//   }
//   move(distanceInMeters = 5) {
//     console.log("Slithering...");
//     super.move(distanceInMeters);
//   }
// }

// class Horse extends Animal {
//   constructor(name: string) {
//     super(name);
//   }
//   move(distanceInMeters = 45) {
//     console.log("Galloping...");
//     super.move(distanceInMeters);
//   }
// }

// let sam = new Snake("Sammy the Python");
// let tom: Animal = new Horse("Tommy the Palomino");

// sam.move();
// tom.move(34);
// interface SquareConfig {
//   color?: string;
//   width?: number;
// }
// DEMO TODO:
// function createSquare(config: SquareConfig): { color: string; area: number } {
//   let newSquare = { color: "white", area: 100 };
//   if (config.color) {
//     newSquare.color = config.color;
//   }
//   if (config.width) {
//     newSquare.area = config.width * config.width;
//   }
//   return newSquare;
// }
// export default function () {
//   let mySquare = createSquare({ color: "black" });
//   console.log("test------", mySquare);
// }
