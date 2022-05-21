import React, { FC, ReactElement, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import TodoCard from './TodoCard';
import todosArray from '../Atoms/todo'
import {handleDeleteRequest,handleGetRequest,handlePatchRequest} from  "../Utilities/requestFunctions"
import TodoEdit from './todoEdit';



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

//handle task click/finish
const handleTaskClick = (e: React.MouseEvent<HTMLElement>)=>{

    const target = e.target as HTMLElement
 
    if(target.style.color == ""){
        target.style.color = "grey"
        target.style.textDecoration ="line-through"
    }

    else if(target.style.color == "grey"){
        target.style.color =""
        target.style.textDecoration =""

    }
}

//handle task edit

const handleTaskEditClick = (e: React.MouseEvent<HTMLElement>)=>{
    const taskId = parseInt(e.currentTarget.id)
    let Newtasks = tasksArray.map(item=>{
        return item.task_id === taskId? {...item, "task_edit" : true}: item
    })
    setTasksArray(Newtasks)
    console.log(Newtasks)
}





//List tasks
let todoListDisplay =  tasksArray.map((tasks,index)=>{
    return (
        <div key = {index} className = "todocontainer shadow-sm border border-secondary / d-flex justify-content-between align-items-center w-100 rounded mb-2">

        {tasks.task_edit?
        <TodoEdit taskId={tasks.task_id} taskName={tasks.task_task_name} deleteTask={handleDeleteRequest}/>
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
            <div className='shadow flex-grow-1 container d-flex flex-column h-100 w-75 mb-5 mt-4 bg-white rounded'>
            
        {tasksArray?
            <div id="displayContainer" className='d-flex flex-column justify-content-start 
            align-items-center todoCard  h-75 w-100 rounded mt-2'>
                {todoListDisplay}
            </div>

            :<></>
        }


            </div>
        </>
    );
}

export default Display;