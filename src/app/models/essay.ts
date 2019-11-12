import { User } from './user';

export class Essay {
    id: number;
    title: string;
    description: string;
    user: User;
    from: Date;
    to: Date;
    type: string;
}