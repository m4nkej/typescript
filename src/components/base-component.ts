namespace App {
  // component base class
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
      templateId: string,
      hostElementId: string,
      insetAtStart: boolean,
      newElemenet?: string
    ) {
      this.templateElement = document.getElementById(
        templateId
      )! as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostElementId)! as T;

      const importetNode = document.importNode(
        this.templateElement.content,
        true
      );

      this.element = importetNode.firstElementChild as U;
      if (newElemenet) {
        this.element.id = newElemenet;
      }

      this.attach(insetAtStart);
    }

    private attach(insetAtStart: boolean) {
      this.hostElement.insertAdjacentElement(
        insetAtStart ? "afterbegin" : "beforeend",
        this.element
      );
    }

    abstract configure(): void;
    abstract renderContent(): void;
  }
}
