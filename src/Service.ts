export const SERVICE_WATERMARK = 'injector:service';

export function Service(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(SERVICE_WATERMARK, true, target);
  };
}
