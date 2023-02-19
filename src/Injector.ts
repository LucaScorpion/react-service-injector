import 'reflect-metadata';
import { Service } from './Service';

export interface ServiceProvider<T> {
  new (...args: never[]): T;
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
    const hasServiceDecorator = !!Reflect.getMetadata('service', target);
    if (!hasServiceDecorator) {
      throw new Error(
        `Service [${target.name}] is missing the @Service decorator`
      );
    }

    // When a class has no explicit constructor, the paramtypes will also be undefined.
    const paramTypes = Reflect.getMetadata('design:paramtypes', target) || [];

    const instance = new target();
    console.debug(`Instantiated service [${target.name}]`);
    return instance;
  }
}
