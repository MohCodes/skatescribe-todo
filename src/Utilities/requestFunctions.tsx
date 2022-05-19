export const handlePostRequest = async(data:object)=>{
    let postRequest = await fetch("http://localhost:5000/postTodo",{
        method: "POST",
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await postRequest.json()
}

export const handleGetRequest = async ()=>{
    let fetchRequest = await fetch("http://localhost:5000/getTodo")
    return fetchRequest.json()
}

export const handleDeleteRequest = async(id:number)=>{
    let fetchRequest = await fetch(`http://localhost:5000/deleteTodo/${id}`,{
        method: "DELETE",
    })
    return fetchRequest.json()
}