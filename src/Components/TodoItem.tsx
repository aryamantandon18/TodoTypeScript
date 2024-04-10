import { Button, Checkbox, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';

type PropType = {
    todo:TodoItemType;
    completeHandler:(id:TodoItemType["id"])=>void;
    deleteHandler:(id:TodoItemType["id"])=>void
    editHandler :(
        id:TodoItemType["id"],
        newTitle:TodoItemType["title"],
    ) => void
}
const TodoItem = ({todo , editHandler,deleteHandler,completeHandler} : PropType) => {
    const [editAble,setEditAble] = useState<boolean>(false);
    const [textVal,setTextVal] = useState<string>(todo.title);
  return (
    <>
     <Paper sx={{padding:"1rem"}}>
        <Stack direction={"row"} alignItems={"center"}>
            {editAble ? (
                <TextField 
                value={textVal} 
                onChange={(e)=> setTextVal(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key == "Enter" && textVal!==""){
                        editHandler(todo.id,textVal);
                        setEditAble(!editAble);
                    }
                }}  
               autoFocus
                />

            ): (<Typography marginRight={"auto"}>{todo.title}</Typography>) 
            }
            <Checkbox onChange={()=>completeHandler(todo.id)} checked={todo.isComplete}/>
            <Button onClick={()=>setEditAble((prev) => !prev)} >{editAble? "✔️": <EditIcon/> }</Button>
            <Button onClick={()=>deleteHandler(todo.id)} sx={{cursor:"pointer"}}>🗑️</Button>
        </Stack>
     </Paper>
    </>
  );
};

export default TodoItem;
