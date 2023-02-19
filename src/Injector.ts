export interface ServiceProvider<T> {
  new(...args: unknown[]): T;
}

export class Injector {
  private readonly instances = new Map<unknown, unknown>();

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
    const instance = new target(this.resolve(Injector));
    console.debug(`Instantiated service [${target.name}]`);
    return instance;
  }
}
