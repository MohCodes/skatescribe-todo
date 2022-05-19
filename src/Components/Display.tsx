import React, { FC, ReactElement, useEffect,useState } from 'react';
import { useRecoilState } from 'recoil';
import TodoCard from './TodoCard';
import todosArray from '../Atoms/todo'
import {handleDeleteRequest,handleGetRequest} from  "../Utilities/requestFunctions"



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
        console.log(tasksArray)

    
},[])


//handle task delete

const handleTaskDelete = async (e: React.ChangeEvent<HTMLInputElement>):Promise<any>=>{
    let taskId = parseInt(e.target.id)
    console.log(taskId)

    await handleDeleteRequest(taskId)
    await handleGetRequest().then(res=>{setTasksArray(res.tasks)})
}

//updating list on state update
let todoListDisplay =  tasksArray.map((tasks,index)=>{
    return (
    <TodoCard key = {index} deleteTask={handleTaskDelete} taskId={tasks.task_id} taskName={tasks.task_task_name}/>
    )
})






    return (  
        <>
            <div className='shadow container d-flex flex-column border border-primary h-100 w-50 mb-5 mt-4 bg-white rounded'>

        {tasksArray?
            <div className='d-flex flex-column justify-content-start align-items-center todoCard  w-100 rounded mt-2'>
                {todoListDisplay}
            </div>

            :<></>
        }


            </div>
        </>
    );
}
 
export default Display;