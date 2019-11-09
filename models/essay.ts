import { User } from './user';
import { Event } from './event';

export class Essay {
    id: number;
    title: string;
    description: string;
    user: User;
    event: Event;
}