import React, { FC, ReactElement } from 'react';
import Display from './Display';



interface MainProps {
    
    
}
 
const Main: FC<MainProps> = ({}): ReactElement => {


    const handlePostRequest = async(data:object)=>{
        await fetch("http://localhost:5000/postTodo",{
            method: "POST",
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })

    }

    const handleGetRequest = async ()=>{
        return await fetch("http://localhost:5000/getTodo")
    }



    const handleSubmit = (e: React.FormEvent<EventTarget>):void=>{
        
        
        let taskInput = document.getElementById("task") as HTMLInputElement
        let taskInputText = taskInput.value
        if(taskInputText=== ""){
            return alert("enter a task")
        }

        let data = {task:taskInputText}
        
        console.log(JSON.stringify(data))
        handlePostRequest(data)
        .then(res => {console.log(res)})
        .catch(err=>console.log(err))
        taskInput.value = " "

        handleGetRequest()
        .then(res=>res.json).then(data=>console.log(data))
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


                        <button onClick={handleSubmit} type="button" className="btn btn-outline-primary bg-primary 
                                mx-4 mt-4 font-weight-bold text-white"> Submit</button>

                    </form>
                </div>

                <Display/>
            
            </div>
        </>
    );
}
 
export default Main;