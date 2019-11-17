"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function createSingletonComponent(defaultState, Component) {
    return /** @class */ (function (_super) {
        __extends(SingletonComponent, _super);
        function SingletonComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = defaultState;
            return _this;
        }
        SingletonComponent.setState = function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.instance) {
                (_a = this.instance).setState.apply(_a, args);
            }
            else {
                throw new Error("Component is not mounted.");
            }
        };
        Object.defineProperty(SingletonComponent, "state", {
            get: function () {
                return this.instance && this.instance.state;
            },
            enumerable: true,
            configurable: true
        });
        SingletonComponent.prototype.componentDidMount = function () {
            if (SingletonComponent.instance) {
                throw new Error("More than one singleton component was mounted.");
            }
            else {
                SingletonComponent.instance = this;
            }
        };
        SingletonComponent.prototype.componentDidUnmount = function () {
            SingletonComponent.instance = undefined;
        };
        SingletonComponent.prototype.render = function () {
            return React.createElement(Component, __assign({}, this.props, this.state));
        };
        return SingletonComponent;
    }(React.Component));
}
exports.createSingletonComponent = createSingletonComponent;
