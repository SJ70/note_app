import { combineReducers } from 'redux';
import notesReducer from './notes';
import tagsReducer from './tags';

const rootReducer = combineReducers({
    notes: notesReducer,
    tags: tagsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;