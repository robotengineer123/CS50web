import { Component, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { Post } from '../../shared/models';
import { DataFetchingService } from '../../data-fetching.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.css',
})
export class PostFeedComponent {
  posts: Signal<Post[]>;

  constructor(private fetchService: DataFetchingService) {
    this.posts = fetchService.fetchPosts();
  }
}
