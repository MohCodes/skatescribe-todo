import React, { FC, ReactElement } from 'react';



interface HeaderProps {
    
}
 
const Header: FC<HeaderProps> = ({}): ReactElement => {
    return (  
        <>
            <div  className='w-100 container h-25 d-flex justify-content-center align-items-center' >
            <nav className = "w-100 navbar navbar-light bg-white h-100 w-100 d-flex justify-content-center align-items-center">
            <span className=" mb-0 h1 text-dark 
                            text-xl h-50  d-flex justify-content-center 
                            align-items-center font-weight-bold">To Do</span>
            </nav>
            </div>
        </>
    );
}
 
export default Header;