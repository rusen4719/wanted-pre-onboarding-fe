import { ChangeEvent, useState } from "react";
import { TODO } from "../../types";

interface TodoItemProps {
  todo: TODO;
  UpdateTodo: (i: number, text: string, checked: boolean) => void;
  DeleteTodo: (i: number) => void;
}

const TodoItem = ({ todo, UpdateTodo, DeleteTodo }: TodoItemProps) => {
  const [isEditState, setEditState] = useState(false);
  const [todoText, setTodoText] = useState(todo.todo);

  const onChangeUpdateTodo = () => {
    UpdateTodo(todo.id, todo.todo, !todo.isCompleted);
  };
  const onClickDeleteTodo = () => {
    DeleteTodo(todo.id);
  };

  const onClickEditTodoText = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.currentTarget.value);
  };

  const onClickChangeEditState = () => {
    setEditState((prev) => !prev);
  };

  const onClickModifyTodoText = () => {
    setEditState((prev) => !prev);
    UpdateTodo(todo.id, todoText, todo.isCompleted);
  };

  return (
    <>
      <span>
        <input type="checkbox" defaultChecked={todo.isCompleted} />
        {isEditState ? (
          <input type="text" value={todoText} onChange={onClickEditTodoText} />
        ) : (
          <span onClick={onChangeUpdateTodo}>{todo.todo}</span>
        )}
      </span>
      <div>
        {isEditState ? (
          <button className="iconUpdate" onClick={onClickChangeEditState}>
            ⭕
          </button>
        ) : (
          <button className="iconUpdate" onClick={onClickModifyTodoText}>
            🖍
          </button>
        )}
        <button className="iconX" onClick={onClickDeleteTodo}>
          ✖
        </button>
      </div>
    </>
  );
};
export default TodoItem;
