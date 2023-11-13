export type User = {
  username: string;
  followers: User;
};

export type Post = {
  id: number;
  poster: User;
  content: string;
  stamp: string;
  comments: Comment[];
  likes: Like[];
};

export type Comment = {
  id: number;
  poster: User;
  text: string;
};

export type Like = {
  poster: User;
};

// class User(AbstractUser):
//     followers = models.ManyToManyField("self", null=True)

// class Post(models.Model):
//     poster = models.ForeignKey(User, on_delete=models.CASCADE)
//     content = models.TextField()
//     stamp = models.DateTimeField(auto_now=True)

// class Comment(models.Model):
//     poster = models.ForeignKey(User, on_delete=models.CASCADE)
//     post = models.ForeignKey(Post, related_name="comments" ,on_delete=models.CASCADE)
//     text = models.TextField()

// class Like(models.Model):
//     poster = models.ForeignKey(User, on_delete=models.CASCADE)
//     post = models.ForeignKey(Post, related_name="likes",on_delete=models.CASCADE)
