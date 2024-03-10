import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
                <h5>Buscar</h5>
                <input  type="text"
                        class="form-control"
                        placeholder="Buscar Gifs..."
                        (keyup.enter)="searchTag()"
                        #txtTagInput>

  `,
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){

  }

  searchTag(){
    const newTag = this.tagInput.nativeElement.value;

    //metodo del servicio
    this.gifsService.searchTag(newTag);

    //limpiamos el input
    this.tagInput.nativeElement.value = '';

    console.log(this.gifsService.tagHistory )

  }

}
