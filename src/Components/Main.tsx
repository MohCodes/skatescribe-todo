import React, { FC, ReactElement } from 'react';
import { useSetRecoilState } from 'recoil';
import Display from './Display';
import todosArray from "../Atoms/todo"
import {handlePostRequest,handleGetRequest} from "../Utilities/requestFunctions"



interface MainProps {
    
    
}

const Main: FC<MainProps> = ({}): ReactElement => {

    // recoil states

    const setTasksArray = useSetRecoilState(todosArray)


    const handleFormSubmit = (e: React.FormEvent<EventTarget>):void=>{
        let taskInput = document.getElementById("task") as HTMLInputElement
        let taskInputText:string = taskInput.value
        if(taskInputText=== ""){
            return alert("enter a task")
        }
        let data:object = {task:taskInputText}
        taskInput.value = ""
        
        handlePostRequest(data)
        .catch(err=>console.log(err))

        handleGetRequest()
        .then(res=>{
            setTasksArray((res.tasks))   
        })
        .catch(err=>console.log(err))

    }





    return (  
        <>
            <div className='container
                            h-100 d-flex flex-column 
                            justify-content-start bg-info mb-3 rounded'>

                <div className='inputContainer d-flex h-25 mt-5 
                                justify-content-center align-items-center rounded '>

                    <form autoComplete='off' className=' todoForm mw-75 h-100 d-flex justify-content-center align-items-center'>

                        <div className='d-flex flex-column h-100 justify-content-center mb-1'>
                            <label htmlFor="task"> Enter Task</label>
                            <input id="task" name="task" type="text" className='rounded border border-secondary form-control input-sm mt-2'></input>
                        </div>


                        <button onClick={handleFormSubmit} type="button" className="btn btn-outline-primary bg-primary 
                                mx-4 mt-4 font-weight-bold text-white"> Submit</button>

                    </form>
                </div>

                <Display/>
            
            </div>
        </>
    );
}

export default Main;