import { Service } from '../../src/Service';

@Service()
export class WithStringParam {
  public constructor(public value: string) {}
}
