import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { feedRoutes } from './feed/post-feed/feed.routes';
import { PostFeedComponent } from './feed/post-feed/post-feed.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then((mod) => mod.authRoutes),
  },
  {
    path: 'feed',
    children: feedRoutes,
  },
];
