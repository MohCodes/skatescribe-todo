export const handlePostRequest = async(data:object)=>{
    let postRequest = await fetch("http://localhost:5000/todos",{
        method: "POST",
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await postRequest.json()
}

export const handleGetRequest = async ()=>{
    let fetchRequest = await fetch("http://localhost:5000/todos")
    return fetchRequest.json()
}

export const handleDeleteRequest = async(id:number)=>{
    let fetchRequest = await fetch(`http://localhost:5000/todos/${id}`,{
        method: "DELETE",
    })
    return fetchRequest.json()
}

export const handlePatchRequest = async(id:number, data:object)=>{
    let fetchRequest = await fetch(`http://localhost:5000/todos/${id}`,{
        method: 'PATCH',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return fetchRequest.json()
}

export const handlePatchEditRequest = async(id:number, state:boolean)=>{
    let fetchRequest = await fetch(`http://localhost:5000/todos/edit/${id}`,{
        method: 'PATCH',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify({"task_edit":state})
    })
    return fetchRequest.json()
}