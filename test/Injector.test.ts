import { Injector } from '../src/Injector';
import { CounterService } from './services/CounterService';
import { CounterService as CounterService2 } from './services/CounterServiceDuplicate';

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
});
