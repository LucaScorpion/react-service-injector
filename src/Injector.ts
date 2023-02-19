import 'reflect-metadata';
import { Service, SERVICE_WATERMARK } from './Service';

export interface ServiceProvider<T> {
  // Here we need to use any, as we don't know what the parameters are.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
}

@Service()
export class Injector {
  private readonly instances = new Map<ServiceProvider<unknown>, unknown>();

  public constructor() {
    this.bindTo(Injector, this);
  }

  public bindTo<T>(target: ServiceProvider<T>, instance: T): void {
    this.instances.set(target, instance);
  }

  public resolve<T>(target: ServiceProvider<T>): T {
    let instance = this.instances.get(target) as T | undefined;

    if (!instance) {
      instance = this.instantiate(target);
      this.bindTo(target, instance);
    }

    if (!instance) {
      throw new Error(`Failed to provide [${target.name}]`);
    }

    return instance;
  }

  private instantiate<T>(target: ServiceProvider<T>): T {
    if (!Reflect.hasMetadata(SERVICE_WATERMARK, target)) {
      throw new Error(
        `Service [${target.name}] is missing the @Service decorator`
      );
    }

    // When a class has no explicit constructor, the paramtypes will also be undefined.
    const paramTypes = Reflect.getMetadata('design:paramtypes', target) || [];

    const args = [];
    for (const param of paramTypes) {
      if (!Reflect.hasMetadata(SERVICE_WATERMARK, param)) {
        throw new Error(
          `Cannot inject [${param.name}] while instantiating [${target.name}]`
        );
      }

      args.push(this.resolve(param));
    }

    const instance = new target(...args);
    console.debug(`Instantiated service [${target.name}]`);
    return instance;
  }
}
