import React, { useCallback, useContext, useEffect, useState } from 'react';
import Card from '../cards';
import { ModalContext } from '../../HOC/GlobalModalProvider';
import { Link } from 'react-router-dom';

const CardHolder = (props) => {
  const [taskList, setTaskList] = useState([]);
  const setModalContent = useContext(ModalContext);

  useEffect(() => {
    console.log('use effect');
    new Promise((resolve, reject) => {
      resolve([
        { taskName: 'task 0', isDone: false, userName: 'Jon' },
        { taskName: 'task 1', isDone: false, userName: 'Jack' },
      ]);
    }).then((data) => {
      setTaskList(data);
    });
    return () => {
      console.log('bue');
    };
  }, []);

  const addTask = () => {
    let newTaskList = [...taskList];
    newTaskList.push({
      taskName: `task ${taskList.length}`,
      isDone: true,
      userName: 'Jon',
    });
    setTaskList(newTaskList);
  };

  const removeTask = useCallback(
    (index) => () => {
      let newTaskList = [...taskList];
      newTaskList.splice(index, 1);
      setTaskList(newTaskList);
    },
    [taskList]
  );

  const changeName = useCallback(
    (index) => () => {
      let result = prompt('New title of task:', '');
      let newTaskList = [...taskList];
      newTaskList[index].taskName = result;
      setTaskList(newTaskList);
    },
    [taskList]
  );

  console.log('cardHolder render');

  return (
    <div>
      <Link to={'/card/123'}>Go</Link>
      <div className="card-row-wrapper">
        <div className="card-row-item-todo">
          <h3>To Do List</h3>
          <div>
            {taskList.map((task, index) => {
              return (
                <div key={task.taskName}>
                  <Card
                    taskName={task.taskName}
                    removeTask={removeTask}
                    isDone={task.isDone}
                    userName={task.userName}
                    index={index}
                    changeName={changeName}
                  />
                </div>
              );
            })}
          </div>
          <button className="button-add" onClick={addTask}>
            Add Task
          </button>
        </div>

        <div className="card-row-item-inprogress">
          <h3>List In Progress</h3>
          <div>
            {taskList.map((task, index) => {
              return (
                <div key={task.taskName}>
                  <Card
                    taskName={task.taskName}
                    removeTask={removeTask}
                    isDone={task.isDone}
                    userName={task.userName}
                    index={index}
                    changeName={changeName}
                  />
                </div>
              );
            })}
          </div>
          <button className="button-add" onClick={addTask}>
            Add Task
          </button>
        </div>

        <div className="card-row-item-done">
          <h3>Done List</h3>
          <div>
            {taskList.map((task, index) => {
              return (
                <div key={task.taskName}>
                  <Card
                    taskName={task.taskName}
                    removeTask={removeTask}
                    isDone={task.isDone}
                    userName={task.userName}
                    index={index}
                    changeName={changeName}
                  />
                </div>
              );
            })}
          </div>
          <button className="button-add" onClick={addTask}>
            Add Task
          </button>
        </div>
        {/* <button className="button-modal" onClick={() => {setModalContent("Modal opened from CardHolder")}}>
          Open Modal 
      </button> */}
      </div>
    </div>
  );
};

export default CardHolder;
