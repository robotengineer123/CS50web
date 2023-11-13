import { Component, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../shared/models';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  @Input({ required: true }) post!: Post;

  onLike() {}

  onComment() {}
}
