import { Service } from '../../src/Service';

@Service()
export class InjectOne {}

@Service()
export class InjectTwo {}

@Service()
export class WithParams {
  public constructor(public one: InjectOne, public two: InjectTwo) {}
}
