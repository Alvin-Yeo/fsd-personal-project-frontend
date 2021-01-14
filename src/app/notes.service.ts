import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";

@Injectable()
export class NotesService {

    private s3Endpoint = '';

    constructor(
        private http: HttpClient
    ) {}

    getS3EndpointOverServer() {
        this.http.get('/s3endpoint').toPromise()
            .then(result => this.s3Endpoint = result['endpoint'])
            .catch(error => console.error(`[ERROR] Error getting S3 Endpoint: `, error));
    }

    getS3Endpoint() {
        return this.s3Endpoint;
    }

    getRandomQuote(): Promise<any> {
        return this.http.get('/quote').toPromise()
            .then(result => result)
            .catch(error => console.error(`[ERROR] Error fectching quote: `, error));
    }

    getNoteList(user: string, order: string = ''): Promise<any> {
        const params = new HttpParams().set('order', order);
        return this.http.get(`/notes/${user}`, { params }).toPromise()
            .then(result => result['notes'])
            .catch(error => console.error(`[ERROR] Error getting notes: `, error));
    }

    getPhotoList(user: string, order: string = ''): Promise<any> {
        const params = new HttpParams().set('order', order);
        return this.http.get(`/photos/${user}`, { params }).toPromise()
            .then(result => result['data'])
            .catch(error => console.error(`[ERROR] Error getting photos: `, error));
    }

    getSingleNote(id: string): Promise<any> {
        return this.http.get(`/note/${id}`).toPromise()
            .then(result => result['note'][0])
            .catch(error => console.error(`[ERROR] Error getting single note: `, error));
    }

    createNote(formData: FormData): Promise<any> {
        return this.http.post('/note', formData).toPromise()
            .then(result => result)
            .catch(error => console.error(`[ERROR] Error creating new note: `, error));
    }

}