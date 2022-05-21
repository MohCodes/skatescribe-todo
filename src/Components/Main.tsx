import React, { FC, ReactElement, useEffect,useState } from 'react';
import { useRecoilState } from 'recoil';
import Display from './Display';
import todosArray from "../Atoms/todo"
import {handlePostRequest,handleGetRequest} from "../Utilities/requestFunctions"
import {socket} from "../App"



interface MainProps {
    
    
}

const Main: FC<MainProps> = ({}): ReactElement => {

    // recoil states

    const [tasksArray,setTasksArray] = useRecoilState(todosArray)


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

    }

    useEffect(()=>{

    },[tasksArray])





    return (  
        <>
            <div className='container shadow-lg
                            mh-100 mw-75 d-flex flex-column mt-5
                            justify-content-start bg-primary px-0  mb-3 rounded flex-grow-1'>

                <div className='inputContainer d-flex h-25 mt-0 bg-white 
                                justify-content-center align-items-center rounded  '>

                    <form  onSubmit={handleFormSubmit} autoComplete='off' className=' todoForm w-100 h-100 
                    d-flex flex-column justify-content-center align-items-center'>

                        <div className='d-flex flex-column mw-25 h-100 justify-content-center '>
                            <label htmlFor="task"> Enter Task</label>
                            <input id="task" name="task" type="text" className='rounded border border-secondary w-100 form-control input-sm mt-2'></input>
                        </div>


                        <button  type="submit" className="btn btn-outline-primary bg-primary 
                                mx-4 mt-2 mb-2 font-weight-bold text-white"> Submit</button>

                    </form>

                </div>

                <Display/>
            
            </div>
        </>
    );
}

export default Main;