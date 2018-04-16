import { Component } from "../../component";

const emitClick = ($sender: Component) => {
    console.log("Emitted from child to child")
    $sender.props.childData = "Bye from child"
}

const emitDouble = ($sender: Component) => {
    console.log("Emitted from child to child")
    $sender.props.childData = "Double Bye from child"
}

const emitExt = ($sender: Component, $receiver: Component) => {
    console.log("Emitted from child to parent")
    $receiver.props.childData = "Bye from child"
}

export const CHILD_ACTIONS = {
    internal: [
        emitClick,
        emitDouble
    ],
    external: [
        emitExt
    ]
}
