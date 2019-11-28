import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class VisitService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`/visits`);
    }

    Update(list: string) {
        return this.http.put(`/visits/`, list);
    }
}