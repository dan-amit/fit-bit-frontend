import React from "react";
import Menu from "./Menu";

const des = "A Fitbit can help you approximate how many calories you burn during any given exercise and can create a snapshot of your overall daily and weekly expenditure.Fitbit dashboard is especially well-suited for weight loss efforts. Its clean, simple interface allows you to input and evaluate health data from a computer or your smartphone. Customizable tiles can help you understand and manage your energy balance. The dashboard can also help you manage your macronutrient balance, track your sleep, set mindfulness goals, and watch daily activity metrics—all factors that are linked to healthy weight loss.";

const Base = ({
  id,
  title = "FitBit",
  description = des,
  className = "bg-dark text-white p-4",
  children
}) => (
  <div>
    <Menu id={id} />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          An Amazing <span className="text-white">MERN</span> Bootcamp
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
