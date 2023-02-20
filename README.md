# React Service Injector

[![Build](https://github.com/LucaScorpion/react-service-injector/actions/workflows/build.yml/badge.svg)](https://github.com/LucaScorpion/react-service-injector/actions/workflows/build.yml)
[![NPM version](https://img.shields.io/npm/v/react-service-injector)](https://www.npmjs.com/package/react-service-injector)
[![NPM bundle size](https://img.shields.io/bundlephobia/min/react-service-injector)](https://www.npmjs.com/package/react-service-injector)

Hooks-based service injection for React.

## Installation

First, install the required packages:

```shell
npm i react-service-injector reflect-metadata
```

Import `reflect-metadata` at the **first line** of your application:

```typescript
import 'reflect-metadata';
// All other imports should come after this!
```

Enable emitting decorator metadata and experimental decorators in your TypeScript configuration:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Finally, in the root of your application, wrap your app component in an `InjectionProvider`:

```tsx
import { Injector, InjectorProvider } from 'react-service-injector';

const injector = new Injector();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <InjectorProvider value={injector}>
      <App />
    </InjectorProvider>
  </React.StrictMode>
);
```

## Usage

To define an injectable service, you need a class with the `@Service()` decorator:

```typescript
import { Service } from 'react-service-injector';

@Service()
export class CounterService {
  public value = 0;
}
```

To use a service in your components, use the `useService` hook:

```tsx
import { useService } from 'react-service-injector';
import { CounterService } from './CounterService';

export const CounterComponent = () => {
  const counter = useService(CounterService);

  return <div>{counter.value}</div>;
}
```

The injector will inject other services into the constructor:

```typescript
import { Service } from 'react-service-injector';
import { CounterService } from './CounterService';

@Service()
export class AnotherService {
  public constructor(private counter: CounterService) {}
}
```

### Manually Binding Services

Sometimes it may be necessary to create a manual binding for a service instance,
rather than letting the Injector figure it out.
This can be especially useful when dealing with services from other packages.

```typescript
import { Injector } from 'react-service-injector';

const injector = new Injector();

const fooInstance = new FooService('I am not injectable');
injector.bindTo(FooService, fooInstance);
```
