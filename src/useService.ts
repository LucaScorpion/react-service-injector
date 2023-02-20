import { createContext, useContext } from 'react';
import { Injector, ServiceProvider } from './Injector';

const InjectorContext = createContext<Injector>(new Injector());

export const InjectorProvider = InjectorContext.Provider;

export function useInjector(): Injector {
  const injector = useContext(InjectorContext);
  if (!injector) {
    throw new Error('Wrap this component in an InjectorProvider');
  }
  return injector;
}

export function useService<T>(provider: ServiceProvider<T>): T {
  return useInjector().resolve(provider);
}
