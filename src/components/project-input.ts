/// <reference path="base-component.ts" />
namespace App {
  // Procject form input class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    peopleInput: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");

      this.titleInput = this.element.querySelector(
        "#title"
      )! as HTMLInputElement;
      this.descriptionInput = this.element.querySelector(
        "#description"
      )! as HTMLInputElement;
      this.peopleInput = this.element.querySelector(
        "#people"
      )! as HTMLInputElement;
      this.configure();
    }

    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent(): void {}

    @AutoBind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.getherUserInput();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);
        this.clearInputs();
      }
    }

    private getherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInput.value;
      const enteredDescription = this.descriptionInput.value;
      const enteredPeople = this.peopleInput.value;

      const titleValidator: Validatable = {
        value: enteredTitle,
        required: true,
        minLength: 4,
      };
      const descriptionValidator: Validatable = {
        value: enteredTitle,
        required: true,
        minLength: 5,
      };
      const peopleValidator: Validatable = {
        value: enteredTitle,
        required: true,
        min: 1,
        max: 6,
      };
      if (
        !validate(titleValidator) ||
        !validate(descriptionValidator) ||
        !validate(peopleValidator)
      ) {
        // alert("invalid input");
        console.log("not valid");
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }

    private clearInputs() {
      this.titleInput.value = "";
      this.descriptionInput.value = "";
      this.peopleInput.value = "";
    }
  }
}
