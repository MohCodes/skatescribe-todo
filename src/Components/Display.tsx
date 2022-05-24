import React, { FC, ReactElement, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import TodoCard from './TodoCard';
import todosArray from '../Atoms/todo'
import {handleDeleteRequest,handleGetRequest,handlePatchRequest,handlePatchEditRequest} from  "../Utilities/requestFunctions"
import TodoEdit from './todoEdit';
import {handleTaskClick} from "../Utilities/taskClickFunction"
import {Socket, io} from 'socket.io-client';



export const socket:any  = io()
socket.connect("http://localhost:5000")




interface DisplayProps {

    
}

const Display: FC<DisplayProps> = ({}): ReactElement => {

//Recoil State
const [tasksArray,setTasksArray] = useRecoilState(todosArray)


//initial GET request
 const socketListener = ()=>{
    socket.emit("updateData")
    const handler = (data:any)=>{
        let jsonData = JSON.parse(data)
        setTasksArray(jsonData.tasks)
        
    }

    socket.on("tasks", handler);

    return () => socket.off("tasks", handler);


}

useEffect(()=>{
        handleGetRequest().then(res=>{
            setTasksArray(res.tasks)
        })


        const handler = (data:any)=>{
            let jsonData = JSON.parse(data)
            setTasksArray(jsonData.tasks)
            
        }
    
        socket.on("tasks", handler);
        socket.emit("updateData")

},[])




//handle task delete
const handleTaskDelete = async (e: React.ChangeEvent<HTMLInputElement>):Promise<any>=>{
    let taskId = parseInt(e.target.id)
    await handleDeleteRequest(taskId)
    socketListener()
    await handleGetRequest().then(res=>{setTasksArray(res.tasks)})
    
}


//handle task edit
const handleTaskEditClick = async (e: React.MouseEvent<HTMLElement>):Promise<any>=>{
    const taskId = parseInt(e.currentTarget.id)
    await handlePatchEditRequest(taskId,true)
    await handleGetRequest().then(res=>setTasksArray(res.tasks))
    socketListener()
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
    await handlePatchEditRequest(taskId,false)
    await handleGetRequest().then(res=>setTasksArray(res.tasks))
    socketListener()

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