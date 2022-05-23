import { FC, ReactElement } from 'react';




interface TaskInputFormProps {
    formSubmit: any,
    
}

const TaskInputForm: FC<TaskInputFormProps> = ({formSubmit}): ReactElement => {







    return (  
        <>

            <form  onSubmit={formSubmit} autoComplete='off' className=' todoForm w-100 h-100 
            d-flex flex-column justify-content-center align-items-center'>

                <div className='d-flex flex-column mw-25 h-100 justify-content-center '>
                    <label htmlFor="task"> Enter Task</label>
                    <input placeholder='Enter a Task :)' id="task" name="task" type="text" className='rounded border 
                    border-secondary w-100 form-control input-sm mt-2'></input>
                </div>


                <button  type="submit" className="btn btn-outline-primary bg-primary 
                        mx-4 mt-2 mb-2 font-weight-bold text-white"> Submit</button>

            </form>
        </>
    );
}

export default TaskInputForm;