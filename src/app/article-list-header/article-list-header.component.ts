import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-article-list-header',
  templateUrl: './article-list-header.component.html',
  styleUrls: ['./article-list-header.component.css']
})
export class ArticleListHeaderComponent implements OnInit {

  private currentFilter: string = 'Time';
  private sortDirection: number = 1;

  constructor() { }

  changeDirection() {
    // update the direction
  }

  changeSort(filter: string) {
    // update the filter
  }

  ngOnInit() {
    jQuery('.ui.dropdown').dropdown();
  }

}
