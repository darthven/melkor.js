export interface Component {
    selector: string,
    template: string,
    styles?: string,
    props?: any,
    children?: Array<() => Component>,
    actions?: {
        internal: Array<(sender: Component) => void>,
        external: Array<(sender: Component, receiver: Component) => void>
    }
}

type ComponentDefinition = (props?: any[]) => Component

interface Action {
    eventType: string,
    listeners: EventListenerOrEventListenerObject[]
}

interface VirtualElement {
    selector: string,
    template: HTMLElement,
    actions?: Action[],
    children?: VirtualElement[],
    componentRef?: Component
}

interface VirtualDOM {
    root: VirtualElement
}

const parseProperties = (component: Component): Component => {
    const properties = component.props;
    if (properties) {
        Object.keys(properties).forEach((propName) => {
            component.template = component.template.replace(`{{${propName}}}`, properties[propName])
        })
    }
    return component
}

const htmlToElement = (html: string): HTMLElement => {
    const template: HTMLElement = document.createElement("div")
    template.innerHTML = html
    return template.firstElementChild as HTMLElement
}

const registerComponent = (componentDefinition: ComponentDefinition, components: Map<string, Component>): void => {
    const component: Component = parseProperties(componentDefinition())
    components.set(component.selector.toUpperCase(), component)
    if (component.children) {
        component.children.forEach((child) => {
            registerComponent(child, components)
        })
    }
}

const handleVirtualElement = (virtualElement: VirtualElement): VirtualElement => {
    if (virtualElement.children) {
        virtualElement.children.filter((child) => child.componentRef).forEach((child) => {
            virtualElement.template.replaceChild(child.template,
                virtualElement.template.querySelector(`${child.selector}`))
        })
    }
    return virtualElement
}

const convertHTMLElementChildren = (element: HTMLElement, components: Map<string, Component>) => {
    return Array.from(element.children).map((child: HTMLElement) => getVirtualElement(child, components))
}

const getVirtualElement = (element: HTMLElement, components: Map<string, Component>): VirtualElement => {
    const component: Component = components.get(element.tagName)
    if (component) {
        const componentTemplate: HTMLElement = htmlToElement(component.template)
        return handleVirtualElement({
            selector: element.tagName,
            template: componentTemplate,
            children: convertHTMLElementChildren(componentTemplate, components),
            componentRef: component
        })
    }
    return handleVirtualElement({
        selector: element.tagName,
        template: element,
        children: convertHTMLElementChildren(element, components)
    })
}

const initializeVirtualDOM = (rootComponent: Component, components: Map<string, Component>): VirtualDOM => {
    return  {
        root: getVirtualElement(htmlToElement(rootComponent.template), components)
    }
}

const applyStyles = (components: Map<string, Component>) => {
    components.forEach((component: Component) => {
        if (component.styles) {
            const css: HTMLStyleElement = document.createElement("style")
            css.type = "text/css"
            css.innerHTML = component.styles
            document.head.appendChild(css)
        }
    })
}

export const MelkorBootstrapComponent = (definition: ComponentDefinition): void => {
    const components: Map<string, Component> = new Map<string, Component>()
    const rootComponent: Component = definition()
    registerComponent(definition, components)
    const virtualDOM: VirtualDOM = initializeVirtualDOM(rootComponent, components)
    applyStyles(components)
    document.addEventListener("DOMContentLoaded", () => document.body.replaceChild(virtualDOM.root.template,
        document.querySelector(`${rootComponent.selector}`)))
}
