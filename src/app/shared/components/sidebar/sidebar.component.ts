import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor( private _gifsService: GifsService ){
  }

  public tagList(): string[] {
    return this._gifsService.tagsHistory;
  }

  public searchAgain(tag: string): void {
    this._gifsService.searchTag(tag);
  }

 }
