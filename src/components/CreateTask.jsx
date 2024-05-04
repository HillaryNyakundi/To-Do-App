import React, { useState } from 'react'
import toast from 'react-hot-toast'; //npm package that gives toast notifications
import { v4 as uuidv4 } from 'uuid'; //npm package that generates a random id

const CreateTask = ({ tasks, setTasks}) => { //destructure the component to receive the props from app.jsx
  
  //receive the input result in a state form
  const [task, setTask] = useState({
    id: "", //useful when dragging and droppin the tasks
    name: "", //name for the task
    status: "todo" //can also be in progress or closed
  });

  console.log(task); //log the task to the console

  const handleSubmit = (e) => { //this function has access to the event.
   e.preventDefault(); //the method is available on our event and it prevents the page from refreshing.

   if(task.name.length < 3) return toast.error("A task must have more than three characters") //check the length of our task name to prevent entering an empty string as task name

   if(task.name.length > 100) return toast.error("A task must not be more than 100 characters")

   setTasks((prev) => { //update our tasks by receiving our previous state/tasks
    const list = [...prev, task]; // spread our prev tasks make some changes to our current tasks and then return the new state

    localStorage.setItem("tasks", JSON.stringify(list)); // use the local storage for persistance(saving) incase of refreshing the page.

    return list //updates our tasks
   });
   
  toast.success("Task Created")

  //clears the input since our value is tied to the state.
  setTask({
    id: "",
    name: "",
    status: "todo"
  });
  };
  

  return ( //an onchange event to change the state whenever we type something(contains an arrow function to receive the event and return something)
  //made it a control component which is being controlled by our state by adding a value prop i.e the value to our input linked to our state(whenever you change the state, our input chnages also, used to clear our input after submitting the task)
  //onSubmit event calling the function handle submit
    <form onSubmit={handleSubmit}>
      <input type="text" className='border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1'
      value={task.name} 
      onChange={(e)=> setTask({...task, id: uuidv4(), name: e.target.value })}
      />
      <button className='bg-cyan-500 rounded-md px-4 h-12 text-white'>Create</button>
    </form>
  )
}

export default CreateTask