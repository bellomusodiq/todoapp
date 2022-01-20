import {StatusEnum} from '../components/OngoingTasks/types';
import categories, {Category, CategoryModelInterface} from './category.model';

export interface Task {
  id?: number;
  categoryId: number;
  title: string;
  notes?: string;
  date: Date;
  timeStart: Date;
  timeEnd: Date;
  status?: StatusEnum;
  progress?: number;
  completed?: boolean;
  categoryObject?: Category;
}

export interface TaskModelInterface {
  _task: Task[];
  getTasks: (categoryId: number) => void;
  getTask: (id: number) => void;
  updateTask: (
    id: number,
    categoryId?: number,
    title?: string,
    notes?: string,
    date?: Date,
    timeStart?: Date,
    timeEnd?: Date,
    status?: StatusEnum,
    progress?: number,
    completed?: boolean,
  ) => void;
  addTask: (
    categoryId: number,
    title: string,
    notes: string,
    date: Date,
    timeStart: Date,
    timeEnd: Date,
  ) => void;
  deleteTask: (id: number) => void;
  filter: (value?: string, isActive?: boolean) => void;
  getCategoryInfo: (categoryId: number) => void;
}

class TaskModel implements TaskModelInterface {
  _task: Task[];
  _categories: CategoryModelInterface;
  constructor() {
    this._task = [];
    this._categories = categories;
  }

  public getTasks(categoryId: number) {
    return this._task.filter((task: Task) => task.categoryId === categoryId);
  }

  public getTask(id: number) {
    return this._task.find((task: Task) => task.id === id);
  }

  private _getTaskById(id: number): Task | undefined {
    return this._task.find((task: Task) => task.id === id);
  }

  public updateTask(
    id: number,
    categoryId?: number | undefined,
    title?: string | undefined,
    notes?: string | undefined,
    date?: Date | undefined,
    timeStart?: Date | undefined,
    timeEnd?: Date | undefined,
    status?: StatusEnum | undefined,
    progress?: number | undefined,
    completed?: boolean | undefined,
  ) {
    const task: Task | undefined = this._getTaskById(id);
    if (!task) return;
    if (title) {
      task.title = title;
    }
    if (categoryId) {
      task.categoryId = categoryId;
      task.categoryObject = this._categories.getCategoryById(categoryId);
    }
    if (notes) {
      task.notes = notes;
    }
    if (date) {
      task.date = date;
    }
    if (timeStart) {
      task.timeStart = timeStart;
    }
    if (timeEnd) {
      task.timeEnd = timeEnd;
    }
    if (status) {
      task.status = status;
    }
    if (progress) {
      task.progress = progress;
    }
    if (completed) {
      task.completed = completed;
    }
    return task;
  }

  public addTask(
    categoryId: number,
    title: string,
    notes: string,
    date: Date,
    timeStart: Date,
    timeEnd: Date,
  ) {
    this._task.push({
      id: this._task.length,
      status: StatusEnum.IN_PROGRESS,
      completed: false,
      categoryId,
      title,
      notes,
      date,
      timeStart,
      timeEnd,
      categoryObject: this._categories.getCategoryById(categoryId),
    });
  }

  public deleteTask(id: number) {
    this._task = this._task.filter((task: Task) => task.id !== id);
    return this._task;
  }

  public filter(value?: string, isActive?: boolean) {
    let newTask: Task[] = [];
    const taskMap: {[key: string]: boolean} = {};
    for (let task of this._task) {
      const title = task.title.toUpperCase();

      const categoryTitle = task.categoryObject?.title.toUpperCase();
      if (taskMap[`${task.id}`]) continue;
      if (value) {
        const newValue = value?.toUpperCase();
        if (
          title.indexOf(newValue) !== -1 ||
          categoryTitle?.indexOf(newValue) !== -1
        ) {
          newTask.push(task);
          taskMap[`${task.id}`] = true;
        }
      }
      if (isActive != null) {
        newTask = this._task.filter(
          (task: Task) => task.completed === isActive,
        );
      }
    }

    return newTask;
  }

  public getCategoryInfo(categoryId: number) {
    let count: number = 0;
    let totalDone: number = 0;
    for (let task of this._task) {
      if (task.categoryId === categoryId) {
        count++;
        if (task.completed) totalDone++;
      }
    }
    const percentage: number = count === 0 ? 0 : totalDone / count;
    return {count, percentage};
  }
}

const tasks = new TaskModel();

// dummy data
tasks.addTask(
  0,
  'Atomic structures',
  'take care of those atoms',
  new Date(2022, 1, 20),
  new Date(2022, 1, 20, 14, 0, 0),
  new Date(2022, 1, 20, 15, 0, 0),
);
tasks.addTask(
  0,
  'Electrochemistry',
  'page 224-256 of inorganic chemistry',
  new Date(2022, 1, 20),
  new Date(2022, 1, 20, 15, 0, 0),
  new Date(2022, 1, 20, 16, 0, 0),
);
tasks.addTask(
  0,
  'Thermodynamics',
  'page 336-356 of inorganic chemistry and read the pdf sent to the group',
  new Date(2022, 1, 20),
  new Date(2022, 1, 20, 15, 0, 0),
  new Date(2022, 1, 20, 16, 0, 0),
);
tasks.addTask(
  1,
  'Data modelling',
  'this is to structure the data for the tasks and categories',
  new Date(2022, 1, 20),
  new Date(2022, 1, 20, 18, 0, 0),
  new Date(2022, 1, 20, 19, 0, 0),
);
tasks.addTask(
  1,
  'Task list',
  'design the task list',
  new Date(2022, 1, 20),
  new Date(2022, 1, 20, 20, 0, 0),
  new Date(2022, 1, 20, 21, 0, 0),
);

export default tasks;
