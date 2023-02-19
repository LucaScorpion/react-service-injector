export function Service(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata('service', true, target);
  };
}
