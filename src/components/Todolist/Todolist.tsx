import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {stateTaskType, TaskType, TodolistType} from '../../App';
import {AddBox, Delete} from '@material-ui/icons';
import {Button, Checkbox, IconButton, TextField} from '@material-ui/core';

type typePropsTodolist = TodolistType & {
    tasks: Array<TaskType>
    removeTask: (id: string, TodoListId: string) => void
    addTask: (title: string, TodoListId: string) => void
    changeFilter: (value: stateTaskType, TodoListId: string) => void
    changeStatus: (id: string, isDone: boolean, TodoListId: string) => void
    changeTitleTask: (id: string, TodoListId: string, newTaskTitle: string) => void
    changeTitle: (id: string, title: string) => void
    removeTodolist: (id: string) => void
}

export function Todolist(props: typePropsTodolist) {

    const [error, setError] = useState<string | null>(null)

    const tasks = props.tasks.map((task) => {
        const onChangeTitleTaskHandler = (newTitle: string) => {
            props.changeTitleTask(task.id, props.id, newTitle);
        }
        const onClickHandler = () => props.removeTask(task.id, props.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const newIsDoneValue = e.currentTarget.checked;
            props.changeStatus(task.id, newIsDoneValue, props.id)
        }

        return (
            <div key={task.id} className={task.isDone ? 'is-done' : ''}>
                <Checkbox onChange={onChangeHandler} checked={task.isDone}/>
                <EditSpan value={task.title} onChange={onChangeTitleTaskHandler}/>
                <IconButton>
                    <Delete onClick={onClickHandler}/>
                </IconButton>
            </div>
        )
    });

    const [titleNewTask, setTitleNewTask] = useState('');

    const addTask = () => {
        if (titleNewTask.trim() !== '') {
            props.addTask(titleNewTask, props.id);
            setError(null);
            setTitleNewTask('');
        } else {
            setError('Title is required')
        }
    }

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setError(null);
        setTitleNewTask(event.currentTarget.value)
    }

    function onKeyPressHandler(event: KeyboardEvent<HTMLInputElement>) {
        if (event.charCode === 13) {
            addTask();
        }
    }

    function onClickHandlerAll() {
        props.changeFilter('all', props.id);
    }

    function onClickHandlerActive() {
        props.changeFilter('active', props.id);
    }

    function onClickHandlerCompleted() {
        props.changeFilter('completed', props.id);
    }

    function inClickHandlerRemoveTodoList() {
        props.removeTodolist(props.id);
    }

    function onChangeTitleHandler(newTitle: string) {
        props.changeTitle(props.id, newTitle);
    }

    return (
        <div>
            <h3>
                <EditSpan value={props.title} onChange={onChangeTitleHandler}/>
                <IconButton>
                    <Delete onClick={inClickHandlerRemoveTodoList}/>
                </IconButton>
            </h3>
            <div>
                <TextField
                    variant={'outlined'}
                    error={!!error}
                    helperText={error}
                    label={'Title'}
                    value={titleNewTask}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}/>
                <IconButton>
                    <AddBox onClick={addTask}/>
                </IconButton>
            </div>
            <div>
                {tasks}
            </div>
            <div>
                <Button color={'default'} variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onClickHandlerAll}>All
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onClickHandlerActive}>Active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onClickHandlerCompleted}>Completed
                </Button>
            </div>
        </div>
    );
}

type EditSpanPropsType = {
    value: string,
    onChange: (newValue: string) => void
}
const EditSpan = (props: EditSpanPropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.value);

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.currentTarget.value);
    }

    function activateViewMode() {
        setEditMode(false)
        props.onChange(title);
    }

    function activateEditMode() {
        setEditMode(true)
        setTitle(props.value)
    }

    return <>
        {editMode
            ? <TextField
                variant={'outlined'}
                type="text"
                autoFocus
                onBlur={activateViewMode}
                onChange={onChangeHandler}
                value={title}
            />
            : <span onDoubleClick={activateEditMode}>{title}</span>}
    </>
}