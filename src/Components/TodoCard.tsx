import React, { FC, ReactElement } from 'react';



interface TodoCardProps {
    taskId: string,
   taskName: string,
}
 
const TodoCard: FC<TodoCardProps> = ({taskId,taskName}): ReactElement => {
    return (  
        <>
                 <div className='todoName d-flex justify-content-start align-items-center p-3 w-75' role = "button">{taskName}</div>
                <div className=' deleteButtonContainer  w-25 h-100 d-flex 
                            justify-content-end align-items-center'>
                    <button id= {taskId} type='button' className=' mx-4 btn btn-danger' >X</button>
                </div>
        </>
    );
}
 
export default TodoCard;