import React,{ useState } from 'react';
import logo from './logo.svg';
import './App.css';


function Todo({todo,index,completeTodo,removeTodo}){
  return (
    <div className="todo" style={{textDecoration: todo.isCompleted?'line-through':''}}>
    {todo.text}
    <div>
    </div>
    </div>
  )
}




function App() {
  const [todos,setTodo] = useState([
    {
      text:'learm about react',
      isCompleted: false
    },
    {
      text:"meat friend for lunch",
      isCompleted:false
    }
  ]);
  async function addTodo(text) {
    const newTodos = [...todos, { text }];
    setTodo(newTodos);
    console.log(newTodos)
    addRes(newTodos)
  };

  const addRes = todos => {
    console.log(todos)
    fetch('http://13.239.26.231:8111/chat/?msg=' + todos, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.msg)
        let text = data.msg
        const newTodos = [...todos, {text}];
        console.log(newTodos)
        setTimeout(setTodo(newTodos),5000);
      });
   
  };


  function TodoForm({ addTodo }) {
    const [value, setValue] = useState("");
    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue("");
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    );
  }
  return (
    <div className="app">
    <div className="todo=list">
    {todos.map((todo,index)=>(
      <Todo
        key={index}
        index={index}
        todo={todo}
      />

    ))}
        <TodoForm addTodo={addTodo} />
    </div>
      
    </div>
  );
}

export default App;
