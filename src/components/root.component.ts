import { Component } from "../component";
import { ParentComponent } from "./parent/parent.component";
import styles from "./root.css"
import template from "./root.html"

export const RootComponent = (): Component => {
    return {
        selector: "root",
        template,
        styles,
        children: [ParentComponent]
    }
}
