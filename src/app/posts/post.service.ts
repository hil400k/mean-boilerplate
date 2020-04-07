import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostsUpdateListened() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    this.posts.push({
      title,
      content
    });
    this.postsUpdated.next([...this.posts]);
  }
}
