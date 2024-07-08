import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
    selector: 'gifs-search-box',
    template: `
    <h5>Buscar</h5>
    <input type="text"
    class="form-control"
    placeholder="Buscar gifs..."
    (keyup.enter)="searchTag()"
    #txtInput
    >
    `
})
export class SearchBoxComponents {

    @ViewChild('txtInput')
    public tagInput!: ElementRef<HTMLInputElement>;

    constructor(private gifsService: GifsService) { }

    searchTag(): void {
        const etiqueta=this.tagInput.nativeElement.value;
        this.gifsService.searchTag(etiqueta);
        this.tagInput.nativeElement.value = '';
    }

}
