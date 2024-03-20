import { ITag } from './ITag';

export interface INote {
    id: number,
    title: string,
    content: string,
    backgroundColor: string,
    date: Date,
    tags: ITag[],
    priority: number
}

export class Note implements INote {
    static idValue: number = 0;

    id: number;
    title: string;
    content: string;
    backgroundColor: string;
    date: Date;
    tags: ITag[];
    priority: number;

    constructor(title: string, content: string, backgroundColor: string, tags: ITag[], priority: number) {
        this.id = Note.idValue++;
        this.title = title;
        this.content = content;
        this.backgroundColor = backgroundColor;
        this.date = new Date();
        this.tags = tags;
        this.priority = priority;
    }
}