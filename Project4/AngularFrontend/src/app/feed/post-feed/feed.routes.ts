import { Routes } from '@angular/router';
import { PostFeedComponent } from './post-feed.component';

export const feedRoutes: Routes = [
  { path: 'following', component: PostFeedComponent },
];
