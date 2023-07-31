//drag and drop interface
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

// validation descriptor
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  console.log(validatableInput);

  let isValid = true;

  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }

  //minLength
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length > validatableInput.minLength;
  }
  //maxLength
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length < validatableInput.maxLength;
  }
  //min
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value > validatableInput.min;
  }
  //max
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value < validatableInput.max;
  }
  return isValid;
}

// autobind descriptor
function AutoBind(_: any, _2: string, decsriptor: PropertyDescriptor) {
  const originalMethod = decsriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
}
enum ProjectStatus {
  Active,
  Finished,
}

// project type
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// project state managment
type Listener<T> = (items: T[]) => void;

abstract class State<T> {
  protected listeners: Listener<T>[] = [];
  addListner(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];

  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, decsription: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      decsription,
      numOfPeople,
      ProjectStatus.Active
    );

    this.projects.push(newProject);
    this.updateListners();
  }

  moveProject(id: string, newStatus: ProjectStatus) {
    const project = this.projects.find((proj) => proj.id === id);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListners();
    }
  }

  private updateListners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

// component base class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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

// Procject form input class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInput = this.element.querySelector("#title")! as HTMLInputElement;
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

// class for project list
class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
    projectState.addListner((projects: Project[]) => {
      const filteredProjects = projects.filter((proj) => {
        if (this.type === "active") {
          return proj.status === ProjectStatus.Active;
        } else {
          return proj.status === ProjectStatus.Finished;
        }
      });
      this.assignedProjects = filteredProjects;
      this.renderProjects();
    });
  }

  @AutoBind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @AutoBind
  dragLeaveHandler(event: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  @AutoBind
  dropHandler(event: DragEvent): void {
    const projId = event.dataTransfer!.getData("text/plain");

    projectState.moveProject(
      projId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const projectItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
    }
  }
}

// class for project item
class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }

  @AutoBind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @AutoBind
  dragEndHandler(event: DragEvent): void {
    console.log("dragEndHandler", event);
  }
}

const projInpu = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
