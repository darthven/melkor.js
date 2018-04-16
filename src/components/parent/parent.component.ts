import { Component } from "../../component";
import { ChildComponent } from "../child/child.component";
import styles from "./parent.css"
import template from "./parent.html"

export const ParentComponent = (): Component => {
    return {
        selector: "parent-comp",
        template,
        styles,
        children: [ChildComponent]
    }
}
