# react-singleton-component

# Installation
```
npm i react-singleton-component
```

# Usage
```JSX
import { createSingletonComponent } from "react-singleton-component";

const SelfIntroduction = createSingletonComponent(
    { name: "John Smith", age: 35 },
    props => <p style={{color: props.color}}>{props.name} ({props.age})</p>
);
ReactDOM.render(<SelfIntroduction color="blue" />, document.getElementById("container"));
SelfIntroduction.setState({ age: SelfIntroduction.state.age + 1 });
```
`createSingletonComponent` returns a React.Component constructor with static method `setState` and static property `state`. The first argument is used as the default state of the returned component, and passed as the props of the component specified in the second argument.

## TypeScript
`createSingletonComponent` has two generics parameters of props and state. They will be combined to one object and passed as props.
```TSX
type Props = { color: string };
type State = { name: string, age: number };
const SelfIntroduction = createSingletonComponent<Props, State>(
    { name: "John Smith", age: 35 },
    props => <p style={{color: props.color}}>{props.name} ({props.age})</p>
);
ReactDOM.render(<SelfIntroduction color="blue" />, document.getElementById("container"));
SelfIntroduction.setState({ age: SelfIntroduction.state.age + 1 });
```
If you do not need props, TypeScript language server will automatically infer the type of state!