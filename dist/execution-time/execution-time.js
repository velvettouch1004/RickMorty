"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureExecutionTime = void 0;
// Method decorator to measure execution time
function MeasureExecutionTime(target, propertyKey, descriptor) {
    descriptor.value = async function (...args) {
        const originalMethod = descriptor.value;
        const start = performance.now(); // Record start time
        const result = await originalMethod.apply(this, args); // Execute the original method
        const end = performance.now(); // Record end time
        const executionTime = end - start; // Calculate execution time
        console.log(`Resolver ${propertyKey} took ${executionTime} milliseconds to execute`);
        return result;
    };
    return descriptor;
}
exports.MeasureExecutionTime = MeasureExecutionTime;
