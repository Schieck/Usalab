import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Essay } from '../models';

@Injectable({ providedIn: 'root' })
export class EssayService {
    constructor(private http: HttpClient) { }

    getAll(type: string) {
        return this.http.get<Essay[]>(`/essays/` + type);
    }

    getAllNoType() {
        return this.http.get<Essay[]>(`/essays`);
    }

    getById(id: number) {
        return this.http.get(`/essays/` + id);
    }

    register(user: Essay) {
        return this.http.post(`/essays/register`, user);
    }

    update(user: Essay) {
        return this.http.put(`/essays/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`/essays/` + id);
    }
}