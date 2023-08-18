import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

interface TodoListProps {
  items: { id: string; text: string }[];
  onDeleteTodo: (id: string) => void;
}

function TodoList(props: TodoListProps): JSX.Element {
  return (
    <ListGroup>
      {props.items.map((todo) => (
        <ListGroup.Item key={todo.id}>
          <span> {todo.text}</span>
          <Button
            onClick={props.onDeleteTodo.bind(null, todo.id)}
            variant="danger"
            className="float-end"
          >
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default TodoList;
