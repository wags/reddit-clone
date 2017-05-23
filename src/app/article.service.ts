import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Article } from './article';

const baseUrl = 'https://newsapi.org';

@Injectable()
export class ArticleService {

  constructor(
    private http: Http
  ) { }

  public getArticles(): Promise<Article[]> {
    return this.http
      .get(`${baseUrl}/v1/articles`)
      .toPromise()
      .then(resp => resp.json())
      .then(json => {
        console.log('json ->', json);
        return json;
      });
  }
}
