import { useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type NewTodoProps = {
  onAddTodo: (todoText: string) => void;
};

function NewTodo(props: NewTodoProps): JSX.Element {
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.onAddTodo(enteredText);
  };

  return (
    <Form
      onSubmit={todoSubmitHandler}
      className="shadow p-3 mb-5 bg-body-tertiary rounded  border"
    >
      <Form.Group as={Row} controlId="todo-text">
        <Form.Label column sm="2">
          Todo Text
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" id="todo-text" ref={textInputRef} />
        </Col>
      </Form.Group>
      <Button type="submit" variant="success">
        Add Todo
      </Button>
    </Form>
  );
}

export default NewTodo;
