class Department {
  //   private id: number;
  //   name: string;
  // private employees: string[] = [];
  protected employees: string[] = [];

  constructor(private readonly id: number, public name: string) {
    //this.id = id;
    //this.name = n;
  }

  describie(this: Department) {
    console.log(`Department (${this.id}): ` + this.name);
  }
  addEmploee(employee: string) {
    this.employees.push(employee);
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
  constructor(id: number, private reports: string[]) {
    super(id, "Accounting");
  }
  addEmploee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(reportName: string) {
    this.reports.push(reportName);
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

const itDepartment = new ITDepartment(2, ["Max"]);
itDepartment.addEmploee("Max");
itDepartment.addEmploee("Valtteri");
console.log(itDepartment);

const accountingDep = new AccountingDepartment(1, ["report1", "report2"]);
accountingDep.addReport("report3");
accountingDep.addEmploee("Lando");
accountingDep.addEmploee("Lewis");
accountingDep.addEmploee("Max");
accountingDep.printEmployeesInfo();
accountingDep.printReports();
