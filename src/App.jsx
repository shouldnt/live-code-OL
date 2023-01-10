import { Checkbox, DatePicker, Input, message } from "antd";
import { useMemo } from "react";
import { useRef, useState } from "react";
import { useContext } from "react";

const filters = {
  all: 'all',
  completed: 'c',
  uncompleted: 'u',
}
const screens = {
  main: 'm',
  addTask: 'a',
  editTask: 'e',
}
const App = () => {
  const [screen, setScreen] = useState(screens.main);
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState('');
  const [date, setDate] = useState(null);
  const [current, setCurrent] = useState(null);
  const idRef = useRef(0);
  const [filter, setFilter] = useState(filters.all)

  const filteredTasks = useMemo(() => {
    if (filters.all === filter) return tasks;
    if (filters.completed === filter) {
      return tasks.filter(task => task.completed);
    }
    if (filters.uncompleted === filter) {
      return tasks.filter(task => !task.completed);
    }
  }, [filter, tasks])


  const createTask = (id, text, date) => {
    return {
      id,
      text,
      date,
      completed: false
    }
  }
  const addTask = () => {
    const task = createTask(idRef.current, text, date)
    console.log(task);
    idRef.current++;
    setTasks([task, ...tasks])
    setText('');
    setDate(null);
  }
  const save = (task) => {
    setTasks(tasks.map(t => {
      if (task.id === t.id) {
        return {
          ...task
        }
      }
      return task;
    }))
    setText('');
    setDate(null);
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    setScreen(screens.main);
  }

  return (
    <div className="screen">
      {screen === screens.main && (<div className="header container">Board</div>)}
      {screen === screens.addTask && (<div className="header container">

        <div onClick={() => {
          setScreen(screens.main);
        }}><i className="ri-arrow-left-s-line"></i>
        </div>
        <div> Add task </div>
      </div>)}
      {screen === screens.editTask && (<div className="header container">
        <div onClick={() => {
          setScreen(screens.main);
        }}><i className="ri-arrow-left-s-line"></i>
        </div>
        <div>Edit task</div>
      </div>)}
      {screens.main === screen && (
        <>
          <div className="container mb-3 flex gap-3">
            {Object.entries(filters).map(([key, value]) => {
              return <div
                className={value !== filter ? 'opacity-50' : ''}
                onClick={() => {
                  console.log(value);
                  setFilter(value)
                }}>{key}</div>
            })}
          </div>
          <div className="container grid gap-y-3">
            {filteredTasks.map((task) => {
              return (
                <div key={task.id}
                  className="flex items-center gap-2"
                >
                  <Checkbox checked={task.completed}
                    onChange={(e) => {
                      setTasks(tasks.map(t => {
                        if (t.id === task.id) {
                          return {
                            ...task,
                            completed: e.target.checked
                          }
                        }
                        return t;
                      }))
                    }}
                  />
                  <div
                    onClick={(e) => {
                      console.log(task);
                      setCurrent({
                        ...task
                      })
                      setScreen(screens.editTask);
                    }}
                  >{task.text}</div>
                </div>
              )

            })}
            <button className="btn w-full" onClick={() => {
              setScreen(screens.addTask);
            }}>Add a task</button>
          </div>
        </>

      )}

      {screen === screens.addTask && (
        <>
          <div className="container border">
            <Input type="text" value={text} onChange={(e) => {
              setText(e.target.value)
            }} />
            <DatePicker
              className="w-full"
              value={date}
              onChange={setDate}
            />
            <div>
              <button className="btn w-full" onClick={() => {
                addTask();
                setScreen(screens.main)
              }}>Add a task</button>
            </div>
          </div>

        </>
      )}
      {screen === screens.editTask && (
        <>
          <div className="container edit-view border">
            <Input type="text" value={current.text} onChange={(e) => {
              setCurrent({
                ...current,
                text: e.target.value
              })
            }} />
            <DatePicker
              className="w-full"
              value={current.date}
              onChange={(date) => {
                setCurrent({
                  ...current,
                  date
                })
              }}
            />
            <div className=" flex gap-3">
              <button className="btn w-full" onClick={() => {
                save(current);
                message.success('save success!')
              }}>Save</button>
              <button className="btn red w-full" onClick={() => {
                deleteTask(current.id);
                message.success('delete success!')
              }}>Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
  )

}

export default App;