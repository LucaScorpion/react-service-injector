import { createContext, useContext } from 'react';
import { Injector, ServiceProvider } from './Injector';

const Context = createContext<Injector | undefined>(undefined);

export const InjectionProvider = Context.Provider;

export function useService<T>(provider: ServiceProvider<T>): T {
  const injector = useContext(Context);
  if (!injector) {
    throw new Error('Wrap this component in an InjectionProvider');
  }
  return injector.resolve(provider);
}
