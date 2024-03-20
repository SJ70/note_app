import { ITag } from './ITag';

export interface INote {
    id: number,
    title: string,
    content: string,
    tags: ITag[],
    backgroundColor: string,
    priority: number
    date: Date,
}

export class Note implements INote {
    static idValue: number = 0;

    id: number;
    title: string;
    content: string;
    tags: ITag[];
    backgroundColor: string;
    priority: number;
    date: Date;

    constructor(title: string, content: string, tags: ITag[], backgroundColor: string, priority: number) {
        this.id = Note.idValue++;
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.backgroundColor = backgroundColor;
        this.priority = priority;
        this.date = new Date();
    }
}