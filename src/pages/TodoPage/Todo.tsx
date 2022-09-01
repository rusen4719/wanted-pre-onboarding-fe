import { useNavigate } from "react-router-dom";
import "./Todo.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import TodoItem from "../../components/TodoItem/TodoItem";
import { TODO } from "../../types";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../../services/axios.service";

export default function Todo() {
  const navi = useNavigate();
  const token = window.localStorage.getItem("access_token");
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<TODO[]>([]);

  useEffect(() => {
    if (token === null) {
      window.location.replace("/");
    }
  }, [token]);

  useEffect(() => {
    getTodoList();
  }, []);

  function Logout() {
    window.localStorage.removeItem("access_token");
    navi("/", { replace: true });
  }
  function getTodoList() {
    getTodos().then((Response) => {
      setTodoList([...Response]);
    });
  }

  function CreateTodo(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    createTodo(todo).then((Response) => {
      setTodoList((prev) => [...prev, Response]);
    });
  }

  function UpdateTodo(i: number, text: string, checked: boolean) {
    updateTodo({ id: i, todo: text, isCompleted: checked }).then(() => {
      getTodoList();
    });
  }

  function DeleteTodo(todoId: TODO["id"]) {
    deleteTodo(todoId).then(() =>
      setTodoList((prev) => prev.filter((item) => item.id !== todoId))
    );
  }

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTodo(event.currentTarget.value);
  };

  return (
    <section>
      <button className="logout" onClick={Logout}>
        로그아웃
      </button>
      <form onSubmit={CreateTodo}>
        <input
          type="text"
          placeholder="What needs to be done?"
          onChange={onChangeInput}
        />
        <button type="submit">입력</button>
      </form>
      <ul>
        {todoList.map((todoItem) => (
          <li key={todoItem.id}>
            <TodoItem
              todo={todoItem}
              UpdateTodo={UpdateTodo}
              DeleteTodo={DeleteTodo}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
