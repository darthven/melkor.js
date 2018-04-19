import { MelkorBootstrapComponent } from "./component";
import { RootComponent } from "./components/root.component";

console.time("Bootstrapping component")
MelkorBootstrapComponent(RootComponent)
console.timeEnd("Bootstrapping component")
