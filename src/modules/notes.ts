import { createAction, handleActions } from 'redux-actions';
import { INote } from '../interface/INote';

const ADD = 'note/add';
const SWITCH_PIN = 'note/switchPin';
const DELETE = 'note/delete';
const DELETE_FOREVER = 'note/deleteForever';
const REFRESH = 'note/refresh';

export const addNote = createAction(ADD);
export const switchPin = createAction(SWITCH_PIN);
export const deleteNote = createAction(DELETE);
export const deleteForeverNote = createAction(DELETE_FOREVER);
export const refreshNotes = createAction(REFRESH);

const initialState: INote[] = [];

const notesReducer = handleActions<INote[], any>({
    [ADD]: (state, {payload: {note}}) => [...state, note],
    [SWITCH_PIN]: (state, {payload: {note}}) => {
        note.pinned = !note.pinned;
        return [...state];
    },
    [DELETE]: (state, {payload: {note}}) => {
        note.deleted = true;
        return [...state];
    },
    [DELETE_FOREVER]: (state, {payload: {note}}) => state.filter(n => n !== note),
    [REFRESH]: (state) => [...state],
}, initialState)

export default notesReducer;