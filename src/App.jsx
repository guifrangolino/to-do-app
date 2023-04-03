import { useState } from "react"
import { Container, Input, Button, Flex, Spacer, Item } from "./styles/index"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {

  const [task, setTask] = useState('')
  const [listTask, setListTask] = useState([])
  const [taskId, setTaskId] = useState(0)

  const addTask = () => {
    if(!task) {
      return toast.warn('Preencha uma tarefa!', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    const newTask = {
      id: taskId,
      task: task,
      checked: false
    }
    setTaskId(taskId + 1)
    setListTask([...listTask, newTask])
    setTask('')
    toast.success('Tarefa adicionada com sucesso!', {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  const removeTask = (id) => {
    setListTask(listTask.filter(task => task.id !== id))
  }

  const toggleChecked = (id, checked) => {
    const index = listTask.findIndex(task => task.id === id)
    const newList = listTask
    newList[index].checked = !checked
    setListTask([...newList])
  }

  return (
    <Container>
      <h1 className="title">TODO LIST</h1>
      <Spacer />

      <Flex direction="row">
        <Input 
        placeholder="Digite sua tarefa" 
        onChange={(e) => setTask(e.target.value)}
        value={task}
        onKeyDown={(event) => event.key === 'Enter' && addTask() }
        />
        <Button onClick={addTask}>Adicionar</Button>
      </Flex>
      <Spacer margin="16px" />

      <ul>
        {listTask.map(task => (
          <>
            <Item checked={task.checked} key={task.id}>
              <p>{task.task}</p>
              <Flex direction="row">
                <button onClick={() => toggleChecked(task.id, task.checked)}><i className='bx bx-check'></i></button>
                <button onClick={() => removeTask(task.id)}><i className='bx bx-trash'></i></button>
              </Flex>
            </Item>
            <Spacer margin="12px"/>
          </>
        ))}
      </ul>
      <ToastContainer
      position="top-left"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
    </Container>
  )
}

export default App
