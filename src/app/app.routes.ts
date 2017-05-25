import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { ArticleListComponent} from './article-list/article-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'news/reddit-r-all',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'news/:sourcekey',
    component: ArticleListComponent
  }
];

export const appRoutes = RouterModule.forRoot(routes);
