# Minimalist framework

Simple frontend development with state management, DOM manipulation, and control over data flow.

## Usage

```
import { mount, createData } from 'minimalist'

createData('KEY', { field: dataFunction, ... })

mount(component, getStateSlice, props, elementId, canRender)
```

### Creating data access

#### `createData`: (`key`, `map`) &rarr; `null`

Pushes new data functions onto the `minimalist.DATA` object.

Data can be accessed like so:

```
import { DATA } from 'minimalist'

const calculatedData = DATA.KEY.datafield()
```

### Mounting a component

#### `component`: `props` &rarr; `HTMLElement`

Renders a new component from the passed property values.

#### `getStateSlice`: `state` &rarr; `stateSubfield`

Returns the subset of state that, when changed, will trigger an updated rendering.

#### `props`: `{ key: dataFunction, ... }`

An object that maps property keys to the functions used to access them (typically accessed via the `minimalist.DATA` object, see above).

#### `elementId`: `String`

The DOM element ID where you want the component to be mounted. If `null`, the component will react to state changes invisibly.

#### `canRender`: `state` &rarr; `Boolean`

Determines whether the component should be re-rendered based on the current state.