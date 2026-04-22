import React from "react";
import "./App.css";
import { Person, Student, Teacher } from "./classes";

function App() {
  const people = [
    new Person("Alex Johnson", 30),
    new Student("Emma Watson", 20, "Computer Science"),
    new Teacher("Dr. James Wilson", 45, "Mathematics")
  ];

  return (
    <div className="container">
      <h1>Person Class Hierarchy</h1>

      {people.map((p, index) => (
        <div key={index} className="card">
          <h2>{p.name} ({p.constructor.name})</h2>
          <p>Age: {p.age}</p>
          <p className="italic">{p.introduce()}</p>

          {p instanceof Student && <p>Major: {p.major}</p>}
          {p instanceof Teacher && <p>Teaching: {p.subject}</p>}
        </div>
      ))}
    </div>
  );
}

export default App;
