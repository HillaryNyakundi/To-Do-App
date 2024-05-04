import { useEffect, useState } from 'react'
import CreateTask from './components/CreateTask';
import ListTasks from './components/ListTasks';
import { Toaster } from 'react-hot-toast'; //npm package for giving toast notifications
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


function App() { //use this function as root and parent for other components
  const [tasks, setTasks] = useState([]); //place all tasks at the top level in form of a state.

  console.log("tasks", tasks);
  
  //this hook gets the tasks from the local storage and displays them at the state.
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks"))) //invoke setTasks to change the state and change them from json stream to javascript object.
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
    <Toaster/> 
    <div className='bg-slate-100 w-screen h-screen flex flex-col items-center pt-32 gap-16'>
      <CreateTask tasks={tasks} setTasks={setTasks}/> 
      <ListTasks tasks={tasks} setTasks={setTasks}/>
    </div>
    </DndProvider>
  )
}

export default App
