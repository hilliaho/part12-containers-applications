import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("renders content", () => {
  const todo = {
    text: "Component testing is done with react-testing-library",
    done: false,
  };

  const deleteTodo = () => {
    console.log("delete todo");
  };

  const completeTodo = () => {
    console.log("complete todo");
  };

  render(
    <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
  );

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  expect(element).toBeDefined();
});
