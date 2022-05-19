import { atom } from "recoil";

export interface Todo{
    task: string;
}

const todosArray = atom({
    key:"todosArray",
    default: []
})

export default todosArray