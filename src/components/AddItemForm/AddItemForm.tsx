import React, {useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

function AddItemForm({addItemHandler}: { addItemHandler: (title: string) => void }) {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<null | string>(null)

    function buttonOnClickHandler() {
        if (inputValue === '') {
            setError('Not validated value');
            return false;
        }
        setError(null);
        let title = inputValue.trim();
        addItemHandler(title);
        return true;
    }

    return (
        <div>
            <TextField variant={'outlined'} error={!!error} label={'Title'} helperText={error} value={inputValue} onChange={event => {
                setInputValue(event.currentTarget.value)
            }}/>
            <IconButton>
                <AddBox onClick={buttonOnClickHandler}/>
            </IconButton>
        </div>
    );
}

export default AddItemForm;