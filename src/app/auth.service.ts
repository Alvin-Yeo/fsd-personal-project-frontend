import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class AuthService {
    private token = '';

    event = new Subject<string>();
    
    constructor(
        private http: HttpClient
    ) {}

    getToken(): string {
        return this.token;
    }

    authenticateUser(username: string, password: string): Promise<number> {
        return this.http.post('/login', { username, password }, { observe: 'response' }).toPromise()
            .then(result => {
                this.token = result.body['token'];
                console.info(`[INFO] Token: `, this.token);
                this.event.next(this.token);
                return result.status;
            })
            .catch(error => error.status);
    }

    signUp(username: string, password: string): Promise<number> {
        return this.http.post('/register', { username, password }, { observe: 'response' }).toPromise()
            .then(result => result.status)
            .catch(error => error.status);
    }

}