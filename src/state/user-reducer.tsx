export type StateType = {
  name: string
  age: number
  childrenCount: number
}

// 3 типа действия: action type!!!
// Описание (тип) действия и (возможно!!!) какие - то параметры

type ActionType = {
  type: string
  [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'INCREMENT-AGE' :
      const newState = {...state}
      newState.age = state.age + 1
      return newState
    case 'INCREMENT-CHILDREN-COUNT':
      return {...state, childrenCount: state.childrenCount + 1}
    case 'CHANGE-NAME':
      return {...state, name: action.newName}
    default:
      throw new Error("I don't understand this type")
  }

}