import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { Post } from '../../shared/models';
import { DataFetchingService as DatabaseService } from '../../data-fetching.service';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.css',
})
export class PostFeedComponent {
  posts: Signal<Post[]>;

  constructor(private fetchService: DatabaseService) {
    this.posts = fetchService.posts;
  }
}
