# React Service Injector

[![Build](https://github.com/LucaScorpion/react-service-injector/actions/workflows/build.yml/badge.svg)](https://github.com/LucaScorpion/react-service-injector/actions/workflows/build.yml)
[![NPM bundle size](https://img.shields.io/bundlephobia/min/react-service-injector)](https://www.npmjs.com/package/react-service-injector)

[![npm](https://npmbadge.com/npm/react-service-injector)](https://www.npmjs.com/package/react-service-injector)

Hooks-based service injection for React.

## Installation

Install the package:

```shell
npm i react-service-injector
```

In the root of your application, wrap your app component in an `InjectorProvider`:

```tsx
import { Injector, InjectorProvider } from 'react-service-injector';

const injector = new Injector();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <InjectorProvider value={injector}>
      <App />
    </InjectorProvider>
  </React.StrictMode>
);
```

That's it!
You're now ready to start using the injector.

## Usage

To define an injectable service, you can simply create a class:

```typescript
export class CounterService {
  public value = 0;
}
```

Then, to use this service in your components, use the `useService` hook:

```tsx
import { useService } from 'react-service-injector';
import { CounterService } from './CounterService';

export const CounterComponent = () => {
  const counter = useService(CounterService);

  return <div>{counter.value}</div>;
}
```

The injector will inject itself into the constructor of any class it instantiates.
With this you can inject other services in a service class:

```typescript
import { Injector } from 'react-service-injector';
import { CounterService } from './CounterService';

export class AnotherService {
  private readonly counter: CounterService;

  public constructor(injector: Injector) {
    this.counter = injector.resolve(CounterService);
  }
}
```

### Manually Binding Services

Sometimes it may be necessary to create a manual binding for a service instance,
rather than letting the Injector instantiate it.
This can be especially useful when dealing with services from other packages.

```typescript
import { Injector } from 'react-service-injector';

const injector = new Injector();

const fooInstance = new FooService('I am not injectable');
injector.bindTo(FooService, fooInstance);
```
