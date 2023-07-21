class Department {
  //   private id: number;
  //   name: string;
  // private employees: string[] = [];
  protected employees: string[] = [];
  static fiscalYear = 2023;
  constructor(protected readonly id: number, public name: string) {
    //this.id = id;
    //this.name = n;
  }

  describie(this: Department) {
    console.log(`Department (${this.id}): ` + this.name);
  }
  addEmploee(employee: string) {
    this.employees.push(employee);
  }

  static createEmploee(name: string) {
    return { name: name };
  }

  printEmployeesInfo(this: Department) {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: number, public admins: string[]) {
    super(id, "IT");
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment; // for singelton pattern
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No error found");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please provide valid value");
    }
    this.addReport(value);
  }

  // private set singelton pattern
  private constructor(id: number, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment(1, []);
    return this.instance;
  }

  describie() {
    console.log(`Dep ID: ` + this.id);
  }

  addEmploee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(reportName: string) {
    this.reports.push(reportName);
    this.lastReport = reportName;
  }

  printReports() {
    console.log(this.reports);
  }
}

// const accountingDep = new Department(1, "Accounting");
// console.log(accountingDep);
// accountingDep.describie();

// accountingDep.addEmploee("Max");
// accountingDep.addEmploee("Valtteri");
// accountingDep.printEmployeesInfo();

const employee1 = Department.createEmploee("Ricardo");
console.log(employee1, Department.fiscalYear);

const itDepartment = new ITDepartment(2, ["Max"]);
itDepartment.addEmploee("Max");
itDepartment.addEmploee("Valtteri");
console.log(itDepartment);

// const accountingDep = new AccountingDepartment(1, []);
const accountingDep = AccountingDepartment.getInstance();
const accountingDep2 = AccountingDepartment.getInstance();
console.log(accountingDep, accountingDep2);
//setter & getter
//console.log(accountingDep.mostRecentReport);
accountingDep.addReport("report1");
console.log(accountingDep.mostRecentReport);
accountingDep.mostRecentReport = "report2";
accountingDep.addReport("report3");
accountingDep.addEmploee("Lando");
accountingDep.addEmploee("Lewis");
accountingDep.addEmploee("Max");
accountingDep.printEmployeesInfo();
accountingDep.printReports();
