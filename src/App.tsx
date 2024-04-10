import { useEffect, useState } from 'react';
import { AppBar, Button, Container, Stack, TextField, Toolbar, Typography } from '@mui/material';
import TodoItem from './Components/TodoItem';
import { getTodos, saveTodos } from './utils/features';

function App() {
  const [todos,setTodos] = useState<TodoItemType[]>(getTodos);
  const [title , setTitle] = useState<TodoItemType["title"]>("");

  const completeHandler = (id:TodoItemType["id"]):void=>{
    const newTodos:TodoItemType = todos.map((i)=>{
      if(i.id == id) {i.isComplete = !i.isComplete;}
        return i;
    })
    setTodos(newTodos);
  }
  const editHandler =(id:TodoItemType["id"],newTitle:TodoItemType["title"]):void=>{
    const newTodos:TodoItemType[] = todos.map((i)=>{
      if(i.id == id) i.title = newTitle;
      return i;
    })
    setTodos(newTodos);
  } 
  const deleteHandler =(id:TodoItemType["id"]):void =>{
    const newTodos = todos.filter((i)=> i.id !== id);
    setTodos(newTodos);
  }

  const submitHandler = ()=>{
    const newTodo:TodoItemType = {
      title,
      isComplete:false,
      id: String(Math.random()*1000),
    }
    setTodos(prev => [...prev, newTodo]);
    setTitle("");
  }
  useEffect(()=>{
    saveTodos(todos);
  },[todos])
  return (
    <>
    <Container maxWidth="sm" sx={{height: "100vh"}} >
      <AppBar position="static">
        <Toolbar>
          <Typography>Todo App</Typography>
        </Toolbar>
      </AppBar>

      <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        { todos.map((i)=> (
          <TodoItem 
           key={i.id}
           todo = {i}
           completeHandler={completeHandler}
           editHandler={editHandler}
           deleteHandler={deleteHandler}
          />
        ))}
      </Stack>
      <TextField fullWidth label={"New Task"} value={title} onChange={(e)=>setTitle(e.target.value)}
      onKeyDown={(e)=>{
        if(e.key == "Enter" && title!=="") submitHandler();
      }}
      />
      <Button sx={{margin:"1rem 0 ",fontWeight:"700"}} fullWidth varient="contained" onClick={submitHandler}>Add</Button>
    </Container>
    </>
  )
}

export default App
