import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';

import { Article } from './article';
import { environment } from '../environments/environment';

/*
 * [].sort(compare(a, b))
 * return value
 *   0 == they are equal in sort
 *   1 == a comes before b
 *   -1 == b comes before a
 */
interface ArticleSortFn {
  (a: Article, b: Article): number;
}

interface ArticleSortOrderFn {
  (direction: number): ArticleSortFn;
}

const sortByTime: ArticleSortOrderFn =
  (direction: number) => (a: Article, b: Article) => {
    return direction *
      (b.publishedAt.getTime() - a.publishedAt.getTime());
};

const sortByVotes: ArticleSortOrderFn =
  (direction: number) => (a: Article, b: Article) => {
    return direction * (b.votes - a.votes);
  };

const sortFns = {
  'Time': sortByTime,
  'Votes': sortByVotes
};

@Injectable()
export class ArticleService {
  private _articles: BehaviorSubject<Article[]> =
    new BehaviorSubject<Article[]>([]);

  private _sortByDirectionSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private _sortByFilterSubject: BehaviorSubject<ArticleSortOrderFn> = new BehaviorSubject<ArticleSortOrderFn>(sortByTime);
  private _filterBySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public articles: Observable<Article[]> = this._articles.asObservable();
  public orderedArticles: Observable<Article[]>;

  constructor(
    private http: Http
  ) {
    this.orderedArticles =
      Observable.combineLatest(
        this._articles,
        this._sortByFilterSubject,
        this._sortByDirectionSubject,
        this._filterBySubject
      )
      .map(([
        articles, sorter, direction, filterStr
      ]) => {
        const re = new RegExp(filterStr, 'gi');
        return articles
          .filter(a => re.exec(a.title))
          .sort(sorter(direction));
      });
  }

  public sortBy(
    filter: string,
    direction: number
  ): void {
    this._sortByDirectionSubject.next(direction);
    this._sortByFilterSubject
    .next(sortFns[filter]);
  }

  public filterBy(filter: string) {
    this._filterBySubject.next(filter);
  }

  public getArticles(): void {
    // make the http request -> Observable
    // convert response into article class
    // update our subject
    this._makeHttpRequest('/v1/articles', 'reddit-r-all')
      .map(json => json.articles)
      .subscribe(articlesJSON => {
        const articles = articlesJSON
          .map(articlejson => Article.fromJSON(articlejson));
        this._articles.next(articles);
      });
  }

  private _makeHttpRequest(
    path: string,
    sourceKey: string
  ): Observable<any> {
    const params = new URLSearchParams();
    params.set('apiKey', environment.newsApiKey);
    params.set('source', sourceKey);

    return this.http
      .get(`${environment.baseUrl}${path}`, {
        search: params
      }).map(resp => resp.json());
  }
}
