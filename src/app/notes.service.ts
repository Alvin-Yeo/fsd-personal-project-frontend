import { HttpClient, HttpParams } from "@angular/common/http";
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

    getS3Endpoint(): Promise<any> {
        return this.http.get('/s3endpoint').toPromise()
            .then(result => result['endpoint'])
            .catch(error => console.error(`[ERROR] Error getting S3 Endpoint: `, error));
    }

    getNoteList(user: string): Promise<any> {
        return this.http.get(`/notes/${user}`).toPromise()
            .then(result => result['notes'])
            .catch(error => console.error(`[ERROR] Error getting notes: `, error));
    }

    createNote(formData: FormData): Promise<any> {
        return this.http.post('/note', formData).toPromise()
            .then(result => result)
            .catch(error => console.error(`[ERROR] Error creating new note: `, error));
    }

}