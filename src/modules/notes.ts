import { createAction, handleActions } from 'redux-actions';
import { INote } from '../interface/INote';

const ADD = 'note/add';

export const addNote = createAction(ADD);

const initialState: INote[] = [];

const notesReducer = handleActions<INote[], any>({
    [ADD]: (state, {payload: {note}}) => [...state, note],
}, initialState)

export default notesReducer;