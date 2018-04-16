import { Component } from "../../component"
import { CHILD_ACTIONS } from "./child.actions";
import styles from "./child.css"
import template from "./child.html"

export const ChildComponent = (): Component => {
    return {
        selector: "child-comp",
        template,
        styles,
        props: {
            childData: "Hello from child property"
        },
        actions: CHILD_ACTIONS
    }
}
