// Method decorator to measure execution time
export function MeasureExecutionTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    descriptor.value = async function (...args: any[]) {
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
