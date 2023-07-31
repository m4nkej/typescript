namespace App {
  // autobind descriptor
  export function AutoBind(_: any, _2: string, decsriptor: PropertyDescriptor) {
    const originalMethod = decsriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjustedDescriptor;
  }
}
