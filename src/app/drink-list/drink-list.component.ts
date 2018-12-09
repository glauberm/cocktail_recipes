import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.scss']
})

export class DrinkListComponent {
  @Input() drinks: string;

  public toggleVisibility(preview: Element): void {
    preview.classList.contains('drink-list__preview--active')
      ? preview.classList.remove('drink-list__preview--active')
      : preview.classList.add('drink-list__preview--active');
  }
}
