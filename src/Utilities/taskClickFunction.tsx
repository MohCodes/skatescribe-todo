//handle task click/finish
export const handleTaskClick = (e: React.MouseEvent<HTMLElement>)=>{
    const target = e.target as HTMLElement
    if(target.style.color === ""){
        target.style.color = "grey"
        target.style.textDecoration ="line-through"
    }

    else if(target.style.color === "grey"){
        target.style.color =""
        target.style.textDecoration =""
    }
}