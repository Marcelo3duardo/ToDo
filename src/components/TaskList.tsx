import { useCallback, useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
 
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');




  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle)
      return;

    const newTaskForSet: Task = {
      id: Math.floor(Math.random() * 1000),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks(tasks => [...tasks, newTaskForSet]);
    setNewTaskTitle('');//apagando a mensagem enviada 
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const taskSelect = tasks.map(taskOfList => taskOfList.id === id ? {  ...taskOfList, isComplete: !taskOfList.isComplete } :taskOfList  )

    setTasks(taskSelect);
    /* revisando :
                * toda vez que for pegar para modificar um array de obj tenho que pegar os anteriores e colocar um novo
    */
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const taskSelect = tasks.filter(taskSelected => taskSelected.id !== id);
    //pega todos que forem diferentes do ID selecionado
    setTasks(taskSelect);

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}