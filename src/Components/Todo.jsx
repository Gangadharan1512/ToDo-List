import React, { useEffect, useRef, useState } from 'react'
import todo_img from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

export const Todo = () => {

    const [todoList, setTodoList] = useState(localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")) : []);

    const inputRef = useRef();

    const add = () =>{
        const inputText = inputRef.current.value.trim();
        
        if(inputText === ''){
            return null;
        }
        
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false
        }

        setTodoList((prev)=>[...prev,newTodo]);
        inputRef.current.value = "";
    }

    const deleteTodo = (id) =>{
        setTodoList((prev) => {
            return prev.filter((todo) => todo.id !== id)
        })
    }

    const toggle = (id) =>{
        setTodoList((prev)=>{
            return prev.map((todo)=>{
                if(todo.id===id){
                    return {...todo,isComplete:!todo.isComplete}
                }
                return todo;
            })
        })
    }

    useEffect(()=>{localStorage.setItem("todos", JSON.stringify(todoList))},[todoList])


    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[450px] rounded-xl'>

            {/*-----title-----*/}
            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_img} alt="" />
                <h1 className='text-3xl font-semibold'>To-Do List</h1>
            </div>

            {/*-----input box-----*/}

            <div className='flex items-center my-7 bg-gray-300 rounded-full'>
                <input ref={inputRef} type="text" placeholder='Add Your Task' className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'/>
                <button onClick={add} className='border-none rounded-full bg-sky-800 w-32 h-14 text-white text-lg font-medium'>ADD +</button>
            </div>

            {/*-----to-do list-----*/}
            <div>
                {todoList.map((item, index) => {
                    return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
                })}
                
            </div>

        </div>
    )
}
