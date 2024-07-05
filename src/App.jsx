import { useEffect, useState } from 'react'
import {ToDoProvider} from "./Context"
import ToDoForm from './components/ToDoForm';
import TodoItem from './components/ToDoItem';
function App() {
  const [todos,setTodos]= useState([]);

const addTodo= (todo)=>{
  setTodos((prev)=> [{id:Date.now(),...todo}, ...prev])//for getting the previous todo values also
}
const updateTodo = (id,todo)=>{
  setTodos((prev)=> prev.map((prevTodo)=>(prevTodo.id === id ? todo : prevTodo)))
}
const deleteTodo = (id)=>{
  setTodos((prev)=> prev.filter((todo)=> todo.id !== id))
}
const toggleComplete=(id)=>{
  setTodos((prev)=> prev.map((prevTodo)=>prevTodo.id === id 
? {...prevTodo, completed: !prevTodo.completed}: prevTodo))

} 
useEffect(()=>{
  const todos= JSON.parse(localStorage.getItem("todos"))
  if(todos && todos.length > 0){
    setTodos(todos)
  }
},[])
//for storing the todos  in local storage
useEffect(()=>{
  localStorage.setItem("todos", JSON.stringify(todos))
},[todos])
  return (
    <ToDoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className='bg-[#172842] min-h-screen 
    '>
        <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
          <h1 className='text-2xl font-bold text-center mb-8 mt-2'>Manage Your Todos</h1>
          <div className='mb-4'>
            <ToDoForm />
          </div>
          <div className='flex-wrap flex gap-y-3'>
          {todos.map((todo)=>(
            <div key={todo.id}
            className='w-full'>
              <TodoItem todo={todo}/>
            </div>
          ))}
          </div>
        </div>
      </div>
    </ToDoProvider>
  )
}

export default App
