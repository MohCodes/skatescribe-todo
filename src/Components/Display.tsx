import React, { FC, ReactElement, useEffect,useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import TodoCard from './TodoCard';
import todosArray from '../Atoms/todo'
import {handleDeleteRequest,handleGetRequest} from  "../Utilities/requestFunctions"



interface DisplayProps {
    
}

const Display: FC<DisplayProps> = ({}): ReactElement => {

//Recoil State
const [tasksArray,setTasksArray] = useRecoilState(todosArray)
const [tasksHTML, settasksHTML] = useState()

//initial GET request

useEffect(()=>{

        handleGetRequest().then(res=>{setTasksArray(res.tasks)})
    
    
},[])


//handle task delete

const handleTaskDelete = (e: React.ChangeEvent<HTMLInputElement>)=>{
    let taskId = parseInt(e.target.id)
    console.log(taskId)

    handleDeleteRequest(taskId)
    handleGetRequest().then(res=>{setTasksArray(res.tasks)})
}

//updating list on state update
 let todoListDisplay =  tasksArray.map((tasks,index)=>{
    return (
    <TodoCard key = {index} deleteTask={handleTaskDelete} taskId={tasks.task_id} taskName={tasks.task_task_name}/>
    )
})



useEffect(()=>{
    console.log(tasksArray)
},[tasksArray])







    return (  
        <>
            <div className='container d-flex flex-column border border-primary h-100 w-50 mb-5 mt-4 bg-white rounded'>

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