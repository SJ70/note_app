import { createAction, handleActions } from 'redux-actions';
import { INote } from '../interface/INote';

const ADD = 'note/add';
const SWITCH_PIN = 'note/switchPin';

export const addNote = createAction(ADD);
export const switchPin = createAction(SWITCH_PIN);

const initialState: INote[] = [];

const notesReducer = handleActions<INote[], any>({
    [ADD]: (state, {payload: {note}}) => [...state, note],
    [SWITCH_PIN]: (state, {payload: {note}}) => {
        note.pinned = !note.pinned;
        return [...state];
    }
}, initialState)

export default notesReducer;