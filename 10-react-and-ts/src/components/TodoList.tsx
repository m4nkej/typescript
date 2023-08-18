interface TodoListProps {
  items: { id: string; text: string }[];
}

function TodoList(props: TodoListProps): JSX.Element {
  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

export default TodoList;
