import { createAction, handleActions } from 'redux-actions';
import { ITag } from '../interface/ITag';

const ADD = 'tag/add';
const ADD_NOTE = 'tag/addNote'

export const addTag = createAction(ADD);
export const addNoteInTag = createAction(ADD_NOTE);

const initialState: ITag[] = [];

const tagsReducer = handleActions<ITag[], any> ({
    [ADD]: (state, {payload: {tag}}) => {
        return [...state, tag];
    },
    [ADD_NOTE]: (state, {payload: {tag, note}}) => {
        state.find(tag)?.notes.push(note);
        return [...state];
    }
}, initialState)

export default tagsReducer;