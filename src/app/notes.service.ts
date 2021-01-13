import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class NotesService {

    constructor(
        private http: HttpClient
    ) {}

    getRandomQuote(): Promise<any> {
        return this.http.get('/quote').toPromise()
            .then(result => result)
            .catch(error => console.error(`[ERROR] Error fectching quote: `, error));
    }

}