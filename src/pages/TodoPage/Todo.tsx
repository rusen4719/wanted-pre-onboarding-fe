import { useNavigate } from "react-router-dom"
import './Todo.css';
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

export default function Todo() {
  const baseAPI = 'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production';
  const navi = useNavigate();
  const token = window.localStorage.getItem('access_token');
  const [todo,setTodo] = useState('');
  const [todoList, setTodoList] = useState<{id:number, todo:string, isCompleted:boolean, userId:number}[]>([]);
  const [edited, setEdited] = useState<number[]>([]);
  const modifyButton = (i:number) => {
    setEdited([...edited, i])
  }
  
  useEffect(() => {
    if(token === null) {
      window.location.replace('/')
    }
  },[]);

  function Logout() { 
    window.localStorage.removeItem('access_token');
    navi('/', { replace : true });
  }
  
  async function Submit(event : ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    await axios.post(baseAPI+`/todos`,
      {
        todo : todo
      },
      {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      }
    ).then((Response) => { setTodoList([...todoList,Response.data]) });
  }

  const unmodifyButton = (i:number, text:string,checked:boolean) => {
    if(text !== '') {
      UpdateTodo(i,text, checked);
    }
    const temp = edited.filter((element) => element !== i);
    setEdited(temp);
  }

  async function getTodoList() {
    await axios.get(baseAPI+`/todos`,
    {
      headers : { 'Authorization' : `Bearer ${token}` }
    }).then((Response) => { setTodoList([...Response.data])});
  }

  useEffect(() => {
    getTodoList();
  },[]);

  async function DeleteTodo(i:number) {
    unmodifyButton(i,'',todoList[i].isCompleted);
    await axios.delete(baseAPI+`/todos/${todoList[i].id}`,
      {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      }
    ).then(() => { todoList.splice(i,1); setTodoList([...todoList]); })
  }  

  async function UpdateTodo(i:number, text:string, checked:boolean) {
      await axios.put(baseAPI+`/todos/${todoList[i].id}`,
        {
          todo : text,
          isCompleted : checked
        }, 
        {
          headers : {
            'Authorization' : `Bearer ${token}`
          }    
        }
      ).then(() => { getTodoList() })
  }

  function MakeTodoList() {
    let text = '';
    return(
      todoList.map(function(a,i) {  
        return(
          <li className="item" key={todoList[i].id}>
            <input type="checkbox" defaultChecked={todoList[i].isCompleted} onChange={() => UpdateTodo(i,todoList[i].todo,!todoList[i].isCompleted)} className="check" id={`check${i}`}/>

            {
              edited.includes(i) ? (<input onChange={(evenet) => text = evenet.currentTarget.value } className="content contentInput" type='text' defaultValue={todoList[i].todo}/>) : 
              (<label htmlFor={`check${i}`} className="content">{todoList[i].todo}</label>)
            }
            
            <div className="options">
              {
                edited.includes(i) ? (<button className='iconUpdate' onClick={() => unmodifyButton(i,text,todoList[i].isCompleted)}>⭕</button>) :
                (<button className='iconUpdate' onClick={() => modifyButton(i)} >🖍</button>)
              }
              <button className='iconX' onClick={()=> DeleteTodo(i)}>✖</button>
            </div>
          </li>
        )
      })
    )
  }

  return(
    <section>
      <button className="logout" onClick={() => { Logout() }}>로그아웃</button>
      <form onSubmit={Submit} onReset={()=>{}}>
        <input type="text" placeholder="What needs to be done?" onChange={(text)=> { setTodo(text.currentTarget.value) }} />
        <input type="submit" value='입력'/>
      </form>
      <ul>
        {MakeTodoList()}
      </ul>
    </section>
  )
}