import React, { FC, ReactElement } from 'react';




interface TodoCardProps {
    taskId: string,
    taskName: string,
    deleteTask: any,

}

const TodoCard: FC<TodoCardProps> = ({taskId,taskName,deleteTask}): ReactElement => {

    



    return (  
        <>

        <div className = "todocontainer shadow-sm border border-secondary d-flex justify-content-start align-items-center w-100 rounded mb-2">
            <div className='todoName d-flex justify-content-start align-items-center p-3 w-75' role = "button">{taskName}</div>
            <div className=' deleteButtonContainer  w-25 h-100 d-flex 
                            justify-content-end align-items-center'>
                <button onClick={deleteTask} id= {taskId} type='button' className=' mx-4 btn btn-danger' >X</button>
            </div>
        </div>
        </>
    );
}


export default TodoCard;