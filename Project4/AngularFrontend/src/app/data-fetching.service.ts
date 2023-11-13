import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Post } from './shared/models';

Injectable({ providedIn: 'root' });
export class DataFetchingService {
  postsSignal = signal<Post[]>([]);

  get posts() {
    return this.postsSignal.asReadonly();
  }
  constructor(private http: HttpClient) {
    this.fetchPosts().subscribe((posts) => this.postsSignal.set(posts));
  }

  fetchPosts() {
    return this.http.get<Post[]>('api/posts');
  }

  updatePost(post: Post) {
    this.http.put()
  }
}
