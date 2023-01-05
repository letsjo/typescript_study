"use strict";
exports.__esModule = true;
// OK, {"A", "B"} is a subset of {"A", "B"}:
var ab = Math.random() < 0.5 ? 'A' : 'B';
var ab12 = ab; // OK, {"A", "B"} is a subset of {"A", "B", 12}
var back = twelve;
// ~~~~ Type 'AB12' is not assignable to type 'AB'
//        Type '12' is not assignable to type 'AB'
exports["default"] = {};
