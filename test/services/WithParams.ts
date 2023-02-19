import { Service } from '../../src/Service';

export class InjectOne {}

export class InjectTwo {}

@Service()
export class WithParams {
  public constructor(public one: InjectOne, public two: InjectTwo) {}
}
