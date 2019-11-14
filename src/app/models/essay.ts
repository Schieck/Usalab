import { User } from './user';

export class Essay {
    id: number;
    title: string;
    description: string;
    user: User;
    fromDate: Date;
    toDate: Date;
    fromTime: string;
    toTime: string;
    type: string;
}