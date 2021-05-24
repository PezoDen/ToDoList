type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state:StateType, action: ActionType): StateType => {
   switch(action.type){
       case 'INCREMENT-AGE':
           let stateCopy = {...state}
           stateCopy.age = state.age + 1;
           return stateCopy;
       case 'INCREMENT-CHILDREN-COUNT':
           return {
               ...state,
               childrenCount: state.childrenCount + 1
           }

           // state.childrenCount = state.childrenCount + 1;
           //  return state;
       case 'CHANGE-NAME':
           return {
               ...state,
               name: action.newName
           }
       default:
           throw new Error("I don't understand this type")
    }
}