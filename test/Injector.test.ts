import { Injector } from '../src';
import { CounterService } from './services/CounterService';
import { CounterService as CounterService2 } from './services/CounterServiceDuplicate';
import { WithStringParam } from './services/WithStringParam';
import { InjectorService } from './services/InjectorService';

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

  it('injects itself into the constructor', () => {
    const s = i.resolve(InjectorService);
    expect(s.injector).toBeInstanceOf(Injector);
    expect(s.injector === i).toBeTruthy();
  });

  it('resolves services that do not accept the injector', () => {
    i.bindTo(WithStringParam, new WithStringParam('hello world'));
    const s = i.resolve(WithStringParam);
    expect(s).toBeInstanceOf(WithStringParam);
    expect(s.value).toBe('hello world');
  });
});
