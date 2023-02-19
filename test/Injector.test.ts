import { Injector } from '../src/Injector';

describe('Injector', () => {
  it('binds to itself', () => {
    const i = new Injector();
    const i2 = i.resolve(Injector);
    expect(i === i2).toBeTruthy();
  });
});
