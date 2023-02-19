import { Injector } from '../src/Injector';
import { CounterService } from './services/CounterService';
import { CounterService as CounterService2 } from './services/CounterServiceDuplicate';
import { InjectOne, InjectTwo, WithParams } from './services/WithParams';
import { NoDecorator } from './services/NoDecorator';
import { WithStringParam } from './services/WithStringParam';

describe('Injector', () => {
  let i: Injector;

  beforeEach(() => {
    i = new Injector();
  });

  it('binds to itself', () => {
    const i2 = i.resolve(Injector);
    expect(i === i2).toBeTruthy();
  });

  it('keeps separate instances of identical services', () => {
    const c1 = i.resolve(CounterService);
    const c2 = i.resolve(CounterService2);

    expect(c1.counter).toEqual(c2.counter);
    c1.counter++;
    expect(c1.counter).not.toEqual(c2.counter);
  });

  it('injects other classes into the constructor', () => {
    const w = i.resolve(WithParams);
    expect(w.one).toBeInstanceOf(InjectOne);
    expect(w.two).toBeInstanceOf(InjectTwo);

    expect(i.resolve(InjectOne) === w.one).toBeTruthy();
    expect(i.resolve(InjectTwo) === w.two).toBeTruthy();
  });

  it('errors when instantiating a service with a wrong constructor param', () => {
    expect(() => i.resolve(WithStringParam)).toThrow(
      'Failed to instantiate [WithStringParam]: Service [String] is missing the @Service decorator'
    );
  });

  it('errors when instantiating a service without decorator', () => {
    expect(() => i.resolve(NoDecorator)).toThrow(
      'Service [NoDecorator] is missing the @Service decorator'
    );
  });

  it('resolves a service without decorator when bound manually', () => {
    i.bindTo(NoDecorator, new NoDecorator());
    const res = i.resolve(NoDecorator);
    expect(res).toBeInstanceOf(NoDecorator);
  });

  it('injects a non-service into the constructor when bound manually', () => {
    i.bindTo(String, 'hello world');
    const res = i.resolve(WithStringParam);
    expect(res.value).toEqual('hello world');
  });
});
