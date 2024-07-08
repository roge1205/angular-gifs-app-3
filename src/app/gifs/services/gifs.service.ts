import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
    providedIn: 'root'
})
export class GifsService {

    public gifList: Gif[] = [];

    private _tagsHistory: string[] = [];
    private apiKey: string = 'soj9aTT2THc3XujaIRzDCRF30RgjN73n';
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

    constructor(private http: HttpClient){
        this.loadLocalStorage();
    }

    get tagsHistory(){
        return [...this._tagsHistory];
    }

    public organizeTag(tag: string): void {
        this._tagsHistory = this._tagsHistory.filter( element => element!== tag );
        this._tagsHistory.unshift(tag);
        this._tagsHistory = this.tagsHistory.splice(0,10);
        this.saveLocalStorage();
    }

    searchTag(tag: string):void {
        if( tag.length === 0 ) return;
        this.organizeTag(tag);

        const params = new HttpParams()
            .set('api_key',this.apiKey)
            .set('limit','10')
            .set('q', tag);

        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
        .subscribe( respuesta => {
            this.gifList = respuesta.data;
        });
    }

    private saveLocalStorage(): void {
        localStorage.setItem( 'history', JSON.stringify(this._tagsHistory) );
    }

    private loadLocalStorage(): void {
        if( !localStorage.getItem('history') ) return;
        this._tagsHistory = JSON.parse( localStorage.getItem('history')! );
        if( this._tagsHistory.length === 0 ) return;
        this.searchTag( this._tagsHistory[0] );
    }

}