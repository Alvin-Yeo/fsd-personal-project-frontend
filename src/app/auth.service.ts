import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Subject } from "rxjs";

@Injectable()
export class AuthService implements CanActivate {
    private token = '';
    private user = '';

    event = new Subject<string>();
    
    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    getToken(): string {
        return this.token;
    }

    getUser(): string {
        return this.user;
    }

    authenticateUser(username: string, password: string): Promise<number> {
        return this.http.post('/login', { username, password }, { observe: 'response' }).toPromise()
            .then(result => {
                this.user = username;
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

    isLogin() {
        return this.token != '';
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.isLogin())
            return true;

        return this.router.parseUrl('/');
    }

}