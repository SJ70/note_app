import { ITag, Tag } from '../interface/ITag'
import '../stylesheets/TagsForm.css'
import '../stylesheets/Animation.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import { addTag } from '../modules/tags'
import { Action } from 'redux'
import { useEffect, useState } from 'react'

type SetTagsFormProps = {
    visible: boolean,
    setVisible: Function
    selectedTags: ITag[],
    setSelectedTags: Function
}

const SetTagsForm: React.FC<SetTagsFormProps> = ({visible, setVisible, selectedTags, setSelectedTags}) => {
    
    const tags: ITag[] = useSelector((state: RootState) => state.tags);

    const [inputTagName, setInputTagName] = useState<string>('');

    const dispatch = useDispatch();

    const addNewTag = (tag: ITag) => dispatch(addTag({tag}) as Action);

    const onAddTag = (tag: ITag) => {
        setSelectedTags([...selectedTags, tag]);
    }

    const onRemoveTag = (tag: ITag) => {
        setSelectedTags(selectedTags.filter(t => t !== tag));
    }

    const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const newTag: ITag = new Tag(inputTagName);
            addNewTag(newTag);
            onAddTag(newTag);
            setInputTagName('');
        }
    }

    return (
        <div className={`backdrop ${visible ? 'appear' : 'disappear'}`}>
            <div className='round-border tags-form'>
                <p className='tags-form-type'>ADD Tags</p>
                <button className='close-btn' onClick={() => setVisible(false)}>X</button>
                <input type='text' placeholder='new tag...' value={inputTagName} onChange={(e) => setInputTagName(e.target.value)} onKeyPress={(e) => onPressEnter(e)}></input>
                <ul className='tags'>
                    {tags.map((tag) => 
                        <TagEl key={tag.id} visible={visible} tag={tag} entireTags={tags} selectedTags={selectedTags} onAddTag={onAddTag} onRemoveTag={onRemoveTag}/>
                    )}
                </ul>
            </div>
        </div>
    )
}

type TagElProps = {
    visible: boolean,
    tag: ITag,
    entireTags: ITag[],
    selectedTags: ITag[],
    onAddTag: Function,
    onRemoveTag: Function,
}

const TagEl: React.FC<TagElProps> = ({visible, tag, entireTags, selectedTags, onAddTag, onRemoveTag}) => {

    const [isSelected, setIsSelected] = useState<boolean>(selectedTags.includes(tag));

    useEffect(() => {
        setIsSelected(selectedTags.includes(tag));
    }, [visible])

    return (
        <li key={tag.id} className={`${isSelected ? 'selected' : 'unselected'} tag`}>
            <p>{tag.name}</p>
            {
                isSelected
                ? <button onClick={() => { onRemoveTag(tag); setIsSelected(false); }}>-</button>
                : <button onClick={() => { onAddTag(tag); setIsSelected(true); }}>+</button>
            }
        </li>
    )
}

export default SetTagsForm;