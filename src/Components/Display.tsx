import React, { FC, ReactElement, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import TodoCard from './TodoCard';
import todosArray from '../Atoms/todo'
import {handleDeleteRequest,handleGetRequest,handlePatchRequest} from  "../Utilities/requestFunctions"
import TodoEdit from './todoEdit';
import {handleTaskClick} from "../Utilities/taskClickFunction"




interface DisplayProps {
    
}

const Display: FC<DisplayProps> = ({}): ReactElement => {

//Recoil State
const [tasksArray,setTasksArray] = useRecoilState(todosArray)


//initial GET request

useEffect(()=>{
        handleGetRequest().then(res=>{
            setTasksArray(res.tasks)
        })
},[])


//handle task delete
const handleTaskDelete = async (e: React.ChangeEvent<HTMLInputElement>):Promise<any>=>{
    let taskId = parseInt(e.target.id)
    await handleDeleteRequest(taskId)
    await handleGetRequest().then(res=>{setTasksArray(res.tasks)})
}


//handle task edit
const handleTaskEditClick = (e: React.MouseEvent<HTMLElement>)=>{
    const taskId = parseInt(e.currentTarget.id)
    let Newtasks = tasksArray.map(item=>{
        return item.task_id === taskId? {...item, "task_edit" : true}: item
    })
    setTasksArray(Newtasks)
    console.log(tasksArray)
}

const handleTaskEditSubmit = async ( e: React.MouseEvent<HTMLElement>):Promise<any>=>{
    const taskEditInputElement = e.currentTarget.parentElement
                                .parentElement.previousElementSibling
                                .firstElementChild as HTMLInputElement

    if(!taskEditInputElement.value){
        return alert("Enter Task")
    }
    const newTaskName = taskEditInputElement.value 
    const taskId = parseInt(e.currentTarget.id)
    const newTaskObj = {"task_name": newTaskName}
    await handlePatchRequest(taskId, newTaskObj)
    await handleGetRequest().then(res=>setTasksArray(res.tasks))
}



//List tasks
let todoListDisplay =  tasksArray.map((tasks,index)=>{
    return (
        <div key = {index} 
        className = "todocontainer shadow-sm border border-secondary d-flex justify-content-between align-items-center w-100 rounded mb-2">

            {tasks.task_edit?
                <TodoEdit submitChange={handleTaskEditSubmit} taskId={tasks.task_id} 
                taskName={tasks.task_task_name} deleteTask={handleTaskDelete}/>
            :
                <TodoCard editTask={handleTaskEditClick} completeTask={handleTaskClick} 
                deleteTask={handleTaskDelete} 
                taskId={tasks.task_id} taskName={tasks.task_task_name}/>
            }
        </div>
        )
})






    return (  
        <>
            <div className='shadow flex-grow-1 overflow-auto container 
            d-flex flex-column h-100 w-75 mb-5 mt-4 bg-white rounded'>
            
                {tasksArray?
                    <div id="displayContainer" className='d-flex flex-column justify-content-start 
                    align-items-center todoCard  h-75 w-100 rounded mt-2'>
                    {todoListDisplay}
                    </div>
                    :
                    <></>
                }
            </div>
        </>
    );
}

export default Display;