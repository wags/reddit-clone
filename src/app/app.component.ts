import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <div id="sidebar">
      Sidebar will go here
    </div>
  `
})
export class SidebarComponent {}

@Component({
  selector: 'app-article',
  template: `
    <div>
      <h2>{{ article.title }}</h2>
    </div>
  `
})
export class ArticleComponent {
  @Input() article: Object;
}

@Component({
  selector: 'app-root',
  template: `
    <div id="container">
      <app-sidebar></app-sidebar>
      <div id="content">
        <app-article
          [article]="article"></app-article>
      </div>
    </div>
  `
})
export class AppComponent {
  article: Object;

  constructor() {
    this.article = {
      title: 'The Angular 2 screencast',
      description: 'The easiest way to learn Angular 2 is with Fullstack.io!'
    };
  }
}
