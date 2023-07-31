import { Project } from "../models/project.js";
import { ProjectStatus } from "../models/project.js";
// project state managment
type Listener<T> = (items: T[]) => void;

abstract class State<T> {
  protected listeners: Listener<T>[] = [];
  addListner(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
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

export const projectState = ProjectState.getInstance();
