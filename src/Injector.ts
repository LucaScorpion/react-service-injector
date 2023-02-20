export interface Service<T> {
  new (...args: never[]): T;
}

export interface ServiceProvider<T> {
  new (injector: Injector): T;
}

export class Injector {
  private readonly instances = new Map<Service<unknown>, unknown>();

  public constructor() {
    this.bindTo(Injector, this);
  }

  public bindTo<T>(target: Service<T>, instance: T): void {
    this.instances.set(target, instance);
  }

  public resolve<T>(target: Service<T>): T {
    let instance = this.instances.get(target) as T | undefined;

    if (!instance) {
      // Here we have to assume the target is a valid ServiceProvider,
      // but there's no way to check that without using the `design:paramtypes` metadata.
      instance = this.instantiate(target as ServiceProvider<T>);
      this.bindTo(target, instance);
    }

    if (!instance) {
      throw new Error(`Failed to provide [${target.name}]`);
    }

    return instance;
  }

  private instantiate<T>(target: ServiceProvider<T>): T {
    const instance = new target(this);
    console.debug(`Instantiated service [${target.name}]`);
    return instance;
  }
}
