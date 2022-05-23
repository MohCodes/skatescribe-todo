import  { FC, ReactElement } from 'react';




interface TodoCardProps {
    taskId: string,
    taskName: string,
    deleteTask: any,
    completeTask: any,
    editTask: any,
}

const TodoCard: FC<TodoCardProps> = ({taskId,taskName,deleteTask,completeTask,editTask}): ReactElement => {


    return (  
        <>
            <div  className='todoName d-flex justify-content-start align-items-center p-3 w-75' >
                <p className=" mb-0 p-1 px-2" role = "button" onClick={completeTask}>{taskName}</p>
            </div>

            <div className='buttonsContainer d-flex flex-row justify-content-end '>

                <div className=' editButtonContainer  w-25 h-100 d-flex 
                    justify-content-end align-items-center'>
                    <button onClick={editTask} id= {taskId} type='button' className=' mx-4 btn btn-secondary' >Edit</button>
                </div>


                <div className=' deleteButtonContainer  w-25 h-100 d-flex 
                    justify-content-end align-items-center'>
                    <button onClick={deleteTask} id= {taskId} type='button' className=' mx-4 btn btn-danger' >X</button>
                </div>  
            </div>
    
        </>
    );
}


export default TodoCard;