const url = "http://localhost:3000/posts/";

class PostManager {
    async getPosts() {
        const response = await fetch(url, {
            method: "GET",
            headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            } 
        });

        const data = await response.json();

        this.posts = data;
    }
}

export default PostManager;