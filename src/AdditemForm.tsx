import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  const[title, setTitle] = useState<string>("")
  const[error, setError] = useState<string|null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
    if(error !== null) setError(null)
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === "Enter") addItem()
  }
  const addItem = () => {
    const trimmedTitle = title.trim()
    if(trimmedTitle){
      props.addItem(trimmedTitle)
    } else {
      setError("Title is required!")
    }
    setTitle("")
  }

  return (
    <div>
      <TextField
        variant={"outlined"}
        value={title}
        onChange={ onChangeHandler }
        onKeyPress={ onKeyPressHandler }
        label={"Title"}
        error={!!error}
        helperText={error}
      />
      {/*<input*/}
      {/*  value={title}*/}
      {/*  onChange={ onChangeHandler }*/}
      {/*  onKeyPress={ onKeyPressHandler }*/}
      {/*  className={ error ? "error" : "" }*/}

      {/*/>*/}
      {/*<button onClick={ addItem }>+</button>*/}
      <IconButton color={"primary"} onClick={addItem}>
        <AddBox/>
      </IconButton>

      {/*<Button*/}
      {/*  variant={"contained"}*/}
      {/*  color={"primary"}*/}
      {/*  onClick={addItem}*/}
      {/*>+</Button>*/}
      {/*{error && <div className={"error-message"}>{error}</div>}*/}
    </div>
  )
})

export default AddItemForm