import { createAction, handleActions } from 'redux-actions';
import { ITag } from '../interface/ITag';

const ADD = 'tag/add';
const ADD_NOTE = 'tag/addNote'
const REMOVE = 'tag/remove'

export const addTag = createAction(ADD);
export const addNoteInTag = createAction(ADD_NOTE);
export const removeTag = createAction(REMOVE);

const initialState: ITag[] = [];

const tagsReducer = handleActions<ITag[], any> ({
    [ADD]: (state, {payload: {tag}}) => {
        return [...state, tag];
    },
    [ADD_NOTE]: (state, {payload: {tag, note}}) => {
        state.find(t => t === tag)?.notes.push(note);
        return [...state];
    },
    [REMOVE]: (state, {payload: {tag}}) => {
        for (tag.note of tag.notes) {
            tag.note.tags = tag.note.tags.filter((t: ITag) => t !== tag);
        }
        return state.filter(t => t !== tag)
    }
}, initialState)

export default tagsReducer;