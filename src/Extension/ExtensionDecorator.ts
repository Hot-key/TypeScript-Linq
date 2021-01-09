export function extension(value: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        value.prototype[propertyKey] = descriptor.value;
    }
}

export function extension_namespace(value: any, namespace: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("namespace", namespace)
        console.log("propertyKey", propertyKey)
        value.prototype[namespace][propertyKey] = descriptor.value;
    }
}