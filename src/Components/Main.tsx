import React, { FC, ReactElement } from 'react';
import { useRecoilState } from 'recoil';
import Display from './Display';
import todosArray from "../Atoms/todo"
import {handlePostRequest,handleGetRequest} from "../Utilities/requestFunctions"
import TaskInputForm from './TaskInputForm';
import {socket} from "./Display"



interface MainProps {
    
    
}

const Main: FC<MainProps> = ({}): ReactElement => {

    // recoil states
    const [tasksArray,setTasksArray] = useRecoilState(todosArray)

    const socketListener = ()=>{
        socket.emit("updateData")
        const handler = (data:any)=>{
            let jsonData = JSON.parse(data)
            setTasksArray(jsonData.tasks)
            
        }
    
        socket.on("tasks", handler);
    
        return () => socket.off("tasks", handler);
            
        }

    //form submit
    const handleFormSubmit = async (e: React.FormEvent<EventTarget>):Promise<any>=>{
        e.preventDefault();
        let taskInput = document.getElementById("task") as HTMLInputElement
        let taskInputText:string = taskInput.value

        if(taskInputText=== ""){
            return alert("enter a task")
        }

        let data:object = {task:taskInputText}
        taskInput.value = ""
        
        await handlePostRequest(data)
        .catch(err=>console.log(err))

        await handleGetRequest()
        .then(res=>{
            setTasksArray((res.tasks))
        })
        .catch(err=>console.log(err))
        socketListener()

    }






    return (  
        <>
            <div className='container shadow-lg
                            mh-100 mw-75 d-flex flex-column mt-5
                            justify-content-start bg-primary px-0  mb-3 rounded flex-grow-1'>

                <div className='inputContainer d-flex mh-25 mt-0 bg-white 
                                justify-content-center align-items-center rounded  '>
                            
                    <TaskInputForm formSubmit={handleFormSubmit}/>

                </div>

                <Display/>
            
            </div>
        </>
    );
}

export default Main;