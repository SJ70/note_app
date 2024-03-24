import { ITag, Tag } from '../interface/ITag'
import '../stylesheets/Form.css'
import '../stylesheets/TagsForm.css'
import '../stylesheets/Animation.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import { addTag, removeTag } from '../modules/tags'
import { Action } from 'redux'
import { useEffect, useState } from 'react'
import { ReactComponent as AddSvg } from '../svgs/add_700.svg';
import { ReactComponent as RemoveSvg } from '../svgs/remove_700.svg';
import { ReactComponent as CloseSvg } from '../svgs/close_700.svg';

export enum SetTagsType {
    EDIT_TAGS, EDIT_TAGS_OF_NOTES
}

type SetTagsFormProps = {
    tagsType: SetTagsType,
    visible: boolean,
    setVisible: Function
    selectedTags: ITag[],
    setSelectedTags: Function
}

const SetTagsForm: React.FC<SetTagsFormProps> = ({tagsType, visible, setVisible, selectedTags, setSelectedTags}) => {
    
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

    const onRemoveTagFromTags = (tag: ITag) => dispatch(removeTag({tag}) as Action);

    const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const newTag: ITag = new Tag(inputTagName);
            addNewTag(newTag);
            onAddTag(newTag);
            setInputTagName('');
        }
    }

    return (
        <div className={`backdrop ${visible===null ? '' : visible ? 'appear' : 'disappear'}`}>
            <div className='round-border form tags-form'>
                <p className='form-title'>태그 수정하기</p>
                <CloseSvg className='close-btn' onClick={() => setVisible(false)}/>
                <input type='text' placeholder='new tag...' value={inputTagName} onChange={(e) => setInputTagName(e.target.value)} onKeyPress={(e) => onPressEnter(e)}></input>
                <ul className='tags-form-tags'>
                    {tags.map((tag) => 
                        <TagEl key={tag.id} tagsType={tagsType} visible={visible} tag={tag} entireTags={tags} selectedTags={selectedTags} onAddTag={onAddTag} onRemoveTag={onRemoveTag} onRemoveTagFromTags={onRemoveTagFromTags}/>
                    )}
                </ul>
            </div>
        </div>
    )
}

type TagElProps = {
    tagsType: SetTagsType,
    visible: boolean,
    tag: ITag,
    entireTags: ITag[],
    selectedTags: ITag[],
    onAddTag: Function,
    onRemoveTag: Function,
    onRemoveTagFromTags: Function,
}

const TagEl: React.FC<TagElProps> = ({tagsType, visible, tag, entireTags, selectedTags, onAddTag, onRemoveTag, onRemoveTagFromTags}) => {

    const [isSelected, setIsSelected] = useState<boolean>(selectedTags.includes(tag));

    useEffect(() => {
        setIsSelected(selectedTags.includes(tag));
    }, [visible])

    const handleOnRemove = () => {
        onRemoveTagFromTags(tag);
    }

    const handleOnToggle = () => {
        isSelected ? onRemoveTag(tag) : onAddTag(tag);
        setIsSelected(!isSelected);
    }

    switch (tagsType) {
        case SetTagsType.EDIT_TAGS : return (
            <button key={tag.id} className='tags-form-tag all-tags' onClick={handleOnRemove}>
                <p className='tags-form-tag-name'>{tag.name}</p>
                <CloseSvg className='svg'/>
            </button>
        )
        case SetTagsType.EDIT_TAGS_OF_NOTES : return (
            <button key={tag.id} className={`${isSelected ? 'selected' : 'unselected'} tags-form-tag`} onClick={handleOnToggle}>
                <p className='tags-form-tag-name'>{tag.name}</p>
                {isSelected ? <RemoveSvg className='svg'/> : <AddSvg className='svg'/>}
            </button>
        )
    }
}

export default SetTagsForm;