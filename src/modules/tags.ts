import { createAction, handleActions } from 'redux-actions';
import { ITag } from '../interface/ITag';

const ADD = 'tag/add';
const ADD_NOTE = 'tag/addNote'

export const addTag = createAction(ADD);
export const addNoteInTag = createAction(ADD_NOTE);

let idValue = 0;

const initialState: ITag[] = [];

const tagsReducer = handleActions<ITag[], any> ({
    [ADD]: (state, {payload: {tagName}}) => {
        const newTag = {
            id: idValue++, 
            name: tagName, 
            notes: []
        };
        return [...state, newTag];
    },
    [ADD_NOTE]: (state, {payload: {tag, note}}) => {
        state.find(tag)?.notes.push(note);
        return [...state];
    }
}, initialState)

export default tagsReducer;