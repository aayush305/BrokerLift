export interface Todo {
  _id: string
  task: string
  completed: boolean
}

export interface TodoCreate {
  task: string
}

export interface TodoUpdate {
  completed: boolean
}
