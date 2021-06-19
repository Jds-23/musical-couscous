import { v4 as uuidv4 } from "uuid";
interface TasksInterface {
  completed: boolean;
  title: string;
  id: string;
}
interface StateInterface {
  tasks: TasksInterface[];
  user: string | undefined;
  nofActiveTask: number;
}
const ADD_TASK = "ADD_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const DONE_UNDONE_TASK = "DONE_UNDONE_TASK";
const REORDER_TASK = "REORDER_TASK";

export const initialState: StateInterface = {
  tasks: [],
  user: undefined,
  nofActiveTask: 0,
};

export const reducer = (state: StateInterface, action: any) => {
  switch (action.type) {
    case ADD_TASK: {
      if (action.title !== "") {
        const newTask = {
          title: action.title,
          completed: false,
          id: uuidv4(),
        };
        return {
          ...state,
          tasks: [...state.tasks, newTask],
          nofActiveTask: state.nofActiveTask + 1,
        };
      } else {
        return state;
      }
    }
    case REMOVE_TASK: {
      let nofActiveTask;
      let filteredTasks = state.tasks.filter((task) => {
        if (!task.completed && task.id === action.id) {
          nofActiveTask = state.nofActiveTask - 1;
        }
        return task.id !== action.id;
      });
      return { ...state, tasks: [...filteredTasks], nofActiveTask };
    }
    case DONE_UNDONE_TASK: {
      let nofActiveTask;
      let newTasks = state.tasks.map((task) => {
        if (task.id === action.id) {
          if (!task.completed) {
            nofActiveTask = state.nofActiveTask - 1;
          } else {
            nofActiveTask = state.nofActiveTask + 1;
          }
          return { ...task, completed: !task.completed };
        } else {
          return { ...task };
        }
      });
      return { ...state, tasks: [...newTasks], nofActiveTask };
    }
    case REORDER_TASK: {
      if (!action.result.destination) return { ...state };
      const newTasks = Array.from(state.tasks);
      const [reorderedItem] = newTasks.splice(action.result.source.index, 1);
      newTasks.splice(action.result.destination.index, 0, reorderedItem);
      return { ...state, tasks: [...newTasks] };
    }
    default: {
      return state;
    }
  }
};
