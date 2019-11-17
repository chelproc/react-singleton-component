import * as React from "react";

export function createSingletonComponent<P, S>(defaultState: S, Component: React.ComponentType<P & S>) {
    return class SingletonComponent extends React.Component<P, S> {
        public static instance: SingletonComponent;
        public static setState(...args: SingletonComponent["setState"] extends (...args: infer R) => void ? R : never) {
            if (this.instance) {
                this.instance.setState(...args);
            } else {
                throw new Error("Component is not mounted.");
            }
        }
        public static get state() {
            return this.instance && this.instance.state;
        }

        state = defaultState;
        componentDidMount() {
            if (SingletonComponent.instance) {
                throw new Error("More than one singleton component was mounted.");
            } else {
                SingletonComponent.instance = this;
            }
        }
        componentDidUnmount() {
            SingletonComponent.instance = undefined as any;
        }
        render() {
            return <Component {...this.props} {...this.state} />;
        }
    }
}
