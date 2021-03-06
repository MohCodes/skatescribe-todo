import  { FC, ReactElement } from 'react';



interface TodoEditProps {
    taskId: string,
    taskName: string,
    deleteTask: any,
    submitChange:any,
}

const TodoEdit: FC<TodoEditProps> = ({taskId,deleteTask,submitChange}): ReactElement => {


    return (  
        <>

        
            <div  className='todoName d-flex justify-content-start align-items-center p-3 w-75' >
                <input required id={"input"+taskId} className=" mb-0 p-1 px-2" type = "text"></input>
            </div>
            
            <div className='buttonsContainer d-flex flex-row justify-content-end '>

                <div className=' editButtonContainer  w-25 h-100 d-flex 
                    justify-content-end align-items-center'>
                    <button onClick={submitChange} id= {taskId} type='button' className=' mx-4 btn btn-success' >OK</button>
                </div>


                <div className=' deleteButtonContainer  w-25 h-100 d-flex 
                    justify-content-end align-items-center'>
                    <button onClick={deleteTask} id= {taskId} type='button' className=' mx-4 btn btn-danger' >X</button>
                </div>

                    
            </div>
        
        </>
    );
}


export default TodoEdit;