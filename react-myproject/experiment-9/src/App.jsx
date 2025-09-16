import React from "react";

// Base class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  displayInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

// Student subclass
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  displayInfo() {
    return `${super.displayInfo()}, Grade: ${this.grade}`;
  }
}

// Teacher subclass
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  displayInfo() {
    return `${super.displayInfo()}, Subject: ${this.subject}`;
  }
}

function App() {
  // Create instances
  const student1 = new Student("Arushi", 20, "A");
  const teacher1 = new Teacher("Mr. Sharma", 40, "Mathematics");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Person Class Hierarchy Demo</h2>
      <div>
        <h3>Student</h3>
        <p>{student1.displayInfo()}</p>
      </div>
      <div>
        <h3>Teacher</h3>
        <p>{teacher1.displayInfo()}</p>
      </div>
    </div>
  );
}

export default App;
