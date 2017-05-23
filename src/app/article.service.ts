import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Article } from './article';

const baseUrl = 'https://newsapi.org';
const newsApiKey = '3f42a565c14e4b1a87456bde7ec4faca';

@Injectable()
export class ArticleService {

  constructor(
    private http: Http
  ) { }

  public getArticles(): Promise<Article[]> {
    const params = new URLSearchParams();
    params.set('apiKey', newsApiKey);
    params.set('source', 'reddit-r-all');

    return this.http
      .get(`${baseUrl}/v1/articles`, {
        search: params
      })
      .toPromise()
      .then(resp => resp.json())
      .then(json => json.articles)
      .then(articles => {
        console.log('json ->', articles);
        return articles
          .map(article =>
          Article.fromJSON(article));
      })
      .catch(err => {
        console.log('We got an error', err);
      });
  }
}
