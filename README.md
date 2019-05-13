# Minimalist framework

Simplified frontend development with state management, DOM manipulation, and control over data flow.

## Usage

```
import { mount, setState, getState, createData, DATA } from 'minimalist'
```

### State Management

Manage a single state object for the application. All rendering and updates to the application are initiated by changes to this object.

```
setState({ ...getState(), newfield: 'data' })
```

### Creating data access

#### `createData`: (`key`, `map`) &rarr; `null`

Pushes new data functions onto the `minimalist.DATA` object. These functions can access the DOM (via `document`) and state (via `getState`) to get data for the application to render.

```
createData('KEY', {
    data: () => document.getElementById('data').innerHTML,
    ...
  })
```

Access the data:

```
const calculatedData = DATA.KEY.datafield()
```

### Mounting a component

```
const component = function (props) {
  return document.createTextNode(props.title)
}

const getStateSlice = function (state) {
  return state.importantPart
}

const props = {
  // note that these are data access functions, NOT values
  title: DATA.INFO.title,
  text: () => 'quality content'
  ...
}

const canRender = function (state) {
  return (state.status === 'visible')
}

mount(component, getStateSlice, props, 'elementId', canRender)
```

#### `component`: `props` &rarr; `HTMLElement`

Renders a new component from the passed property values.

#### `getStateSlice`: `state` &rarr; `stateSubfield`

The `component` function is called when state changes (specifically, when `oldState !== newState`). This function defines the part that will be examined. Changes to other fields of `state` will not trigger updates.

```
const getStateSlice = function (state) {
  return state.importantPart
}
```

#### `props`: `{ key: dataFunction, ... }`

An object that maps property keys to the functions used to access them. Typically accessed via the `minimalist.DATA` object (see ex. above).

#### `elementId`: `String`

The DOM element ID where you want the component to be mounted. If `null`, `component` and `props` are still evaluated but nothing will be rendered.

#### `canRender`: `state` &rarr; `Boolean`

Decides whether the component should be re-rendered. If return value is `false`, no changes will be made.

### Asynchronous data requests

Data functions should be fast and synchronous so that components can be rendered efficiently. But asynchronous work can still be done as follows:

```
const dataFetch = function () {
  if (getState().dataLoaded) {
    return getState().data
  }

  fetchDataFromYourAPI('http://yourapiaddress').then(response => {
    setState({
      dataLoaded: true,
      data: response
    })
  })

  return null
}

createData('QUERIES', {
  content: dataFetch
})
```

The data function initiates async work as needed. When the work is complete, a state change triggers another rendering.

The component can display a loading message until data is available:

```
const component = function (props) {
  if (!props.content) {
    return renderLoadingMessage(props)
  }

  return renderYourComponent(props)
}

mount(component, ..., { content: DATA.QUERIES.content }, ...)
```

## License

MIT