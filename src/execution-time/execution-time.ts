/**
 * Function to calculate the time of execution
 * @returns descriptor
 */
export function measureExecutionTime() {
    return function (_: any, _name: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        if (typeof original === 'function') {

            descriptor.value = async function (...args: any[]) {
                const start = performance.now();
                const result = await original.apply(this, args); // Execute the original method
                const end = performance.now();
                const executionTime = end - start;

                console.log(`Resolver ${_name} took ${executionTime} milliseconds to execute`);
                return result;
            };
        }
        return descriptor;
    };
};
