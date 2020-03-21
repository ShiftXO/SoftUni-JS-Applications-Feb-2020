function solve() {
    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }

        toString() {
            return `Post: ${this.title}\nContent: ${this.content}`;
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content)
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = [];
        }

        addComment(comment) {
            this.comments.push(comment);
        }

        toString() {
            let res = [super.toString()];
            res.push(`Rating: ${this.likes - this.dislikes}`);
            if (this.comments.length > 0) {
                res.push(`Comments:`);
                this.comments.forEach(comment => {
                    res.push(` * ${comment}`);
                });
            }

            return res.join('\n');
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content)
            this.views = views;
        }

        view() {
            this.views++;
            return this
        }

        toString() {
            return super.toString() + '\n' + `Views: ${this.views}`;
        }
    }

    return { Post, SocialMediaPost, BlogPost }
}

solve()