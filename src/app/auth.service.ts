import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { Subject } from "rxjs";

@Injectable()
export class AuthService implements CanActivate {
    private token = '';
    private user = '';

    socialUser: SocialUser;

    event = new Subject<string>();
    
    constructor(
        private http: HttpClient,
        private router: Router,
        private googleAuthServ: SocialAuthService
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
                // console.info(`[INFO] Token: `, this.token);
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

    signOut() {
        if(this.socialUser) {
            this.googleAuthServ.signOut().then(() => {
                console.info('Signed out with Google successfully.');
            });
            this.socialUser = null;
            this.token = '';
        } else {
            this.user = '';
            this.token = '';
            console.info(`[INFO] Logged out.`);
        }

        this.router.navigateByUrl('/', { skipLocationChange: true})
            .then(() => this.router.navigate(['/']));
    }

    signInWithGoogle() {
        this.user = this.socialUser.email;
        this.token = this.socialUser.id;
        this.event.next(this.token);
        console.info('Signed in with Google successfully.');
        this.router.navigate(['/main']);
    }
}