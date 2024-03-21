import { INote } from './INote';

export interface ITag {
    id: number,
    name: string,
    notes: INote[]
}

export class Tag implements ITag{
    static idValue: number = 0;

    id: number;
    name: string;
    notes: INote[];

    constructor(name: string) {
        this.id = Tag.idValue++;
        this.name = name;
        this.notes = [];
    }
}