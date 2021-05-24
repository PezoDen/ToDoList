import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {
    console.log("AddItemForm called")
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addItem= () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
            setError(null)
        }
        if (e.charCode === 13) {
            addItem()
        }
    }
    return <div>
        <TextField
               variant={"outlined"}
               value={title}
               onChange={onChangeTitleHandler}
               onKeyPress={onKeyPressHandler}
               label={"Title"}
               error={!!error}
               helperText={error}
        />
        <IconButton color={"primary"} onClick={addItem} ><AddBox/></IconButton>
    </div>
})