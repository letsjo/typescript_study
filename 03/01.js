"use strict";
exports.__esModule = true;
function calculateArea(shape) {
    if (shape instanceof Rectangle) {
        // ~~~~~~~~~ 'Rectangle' only refers to a type,
        //           but is being used as a value here
        return shape.width * shape.height;
        //         ~~~~~~ Property 'height' does not exist
        //                on type 'Shape'
    }
    else {
        return shape.width * shape.width;
    }
}
exports["default"] = {};
