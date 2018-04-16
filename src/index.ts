import { MelkorBootstrapComponent } from "./component";
import { RootComponent } from "./components/root.component";

console.log("DOCUMENT HEAD BEFORE", document.head)
console.time("Bootstrapping component")
MelkorBootstrapComponent(RootComponent)
console.timeEnd("Bootstrapping component")
