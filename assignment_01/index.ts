interface Taxable {
  takeBonus(bonus: number): void;
}

type Gender = "male" | "female" | "other";

class Person {
  private name: string;
  private gender: Gender;
  private age: number;

  constructor(name: string, gender: Gender, age: number) {
    this.name = name;
    this.gender = gender;
    this.age = age;
  }

  display(): void {
    const pronoun = this.gender === "female" ? "she" : "he";
    console.log(`${this.name} is ${this.gender} and ${pronoun} is ${this.age} years old.`);
  }
}

class Employee extends Person implements Taxable {
  private position: string;
  private salary: number;
  private tax: number = 0.1;
  private bonus?: number;

  constructor(
    name: string,
    gender: Gender,
    age: number,
    position: string,
    salary: number,
    bonus?: number
  ) {
    super(name, gender, age);
    this.position = position;
    this.salary = salary;
    this.bonus = bonus;
  }

  takeBonus(bonus: number): void {
    if (this.bonus === undefined) {
      this.bonus = bonus;
    } else {
      this.bonus += bonus;
    }
  }

  private calculateNetSalary(): number {
    let totalSalary = this.salary;
    if (this.bonus !== undefined) {
      totalSalary += this.bonus;
    }
    const taxAmount = totalSalary * this.tax;
    return totalSalary - taxAmount;
  }

  displayEmployee(): void {
    console.log(`Position: ${this.position}, Salary: $${this.salary}`);
    super.display();
    console.log(`The tax is: $${this.salary * this.tax}`);
    console.log(`The net salary: $${this.calculateNetSalary()}`);
  }
}

const employeeOne = new Employee("David", "male", 18, "software Engineer", 1200);
employeeOne.takeBonus(500); // Add bonus of $500
employeeOne.displayEmployee();
