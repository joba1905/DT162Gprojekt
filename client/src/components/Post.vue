<script>
export default {
  name: "Post",
  data() {
    return {
      posts: [],
      title: "",
      text: "",
      updated: [],
      editmode: false
    }
  },
  methods: {
    //Hämta alla poster med Fetch API
    async getPosts() {

      await fetch("http://localhost:3000/posts/")
        .then(res => res.json())
        .then(data => {
          this.posts = data;
        })
    },

    //Skapa ny post
    async newPost() {

      var newpost = {
        postTitle: this.title,
        postText: this.text
      }

      await fetch("http://localhost:3000/posts/", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(newpost)
      })

      //Rensa inputfält
      this.title = '';
      this.text = '';

      this.getPosts();
    },

    //Radera post med id och läs in på nytt
    async deletePost(_id) {
      fetch("http://localhost:3000/posts/" + _id, {method: "DELETE"})

      this.getPosts();
    },

    //Aktivera redigeringsläge
    editPost(_id, postTitle, postText) {
      this.editmode = true;
      this._id = _id;
      this.title = postTitle;
      this.text = postText;
    },

    //Avslutar redigeringsläge
    cancelEdit() {
      this.editmode = false;
      this.title = "";
      this.text = "";
    },

    //Uppdatera specifik post med id
    async updatePost(_id) {

      this.editmode = false;

      var updatedpost = {
        postTitle: this.title,
        postText: this.text
      }

      await fetch("http://localhost:3000/posts/" + _id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updatedpost)
      });

      this.title = "";
      this.text = "";
      
      this.getPosts(); 
    }
  },
  mounted() {
    this.getPosts();
  }
}
</script>

<template>
  <div class="container">
    
    <div class="add">
      <h1>Att-göra-lista</h1>

      <h2>Lägg till nåt nytt..</h2>

      <div v-if="editmode">
        <input type="text" placeholder="Rubrik" v-model="title">
        <br>
        <textarea class="textbox" type="textarea" placeholder="Säg något viktigt!" v-model="text"></textarea>
        <br>
        <button ref="editbox" class="updateBtn" @click="updatePost(_id)"><i class="bi bi-check-circle"></i> Uppdatera</button>
        <button class="cancelBtn" @click="cancelEdit()"><i class="bi bi-x-octagon"></i> Avbryt</button>
      </div>

      <div v-else>
        <input type="text" placeholder="Rubrik" v-model="title">
        <br>
        <textarea class="textbox" type="textarea" placeholder="Säg något viktigt!" v-model="text"></textarea>
        <br>
        <button class="addBtn" @click="newPost()"><i class="bi bi-plus-lg"></i> Lägg till</button>
      </div>
    </div>

    <div class="list">
      <article v-for="post in posts" :key="posts._id"> 
        <p class="title">{{ post.postTitle }}</p>
        <p class="text">{{ post.postText }}</p>
        <br><button class="editBtn" @click="editPost(post._id, post.postTitle, post.postText)"><i class="bi bi-pencil"></i></button>
        <br><button class="deleteBtn" @click="deletePost(post._id)"><i class="bi bi-trash3"></i></button>
      </article>
    </div>
    
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}

h1, h2 {
  margin: 15px;
}

.add {
  width: 600px;
  padding: 10px 10px 20px 10px;
  margin: 15px auto 0px auto;
  text-align: center;
  background-color: rgb(176, 205, 230);
  border-radius: 8px;
}

.add input {
  font-size: 16px;
  margin-bottom: 20px;
}

.textbox {
  font-size: 16px;
  width: 80%;
  height: 100px;
  padding:15px 10px;
  resize: none;
}

.list {
  background-color: rgb(176, 205, 230);
  border-radius: 8px;
  width: 600px;
  margin: 5px auto;
  padding: 10px;
}

.addBtn, .updateBtn {
  font-weight: bold;
  padding: 2px;
  background-color: transparent;
  cursor: pointer;
  font-size: 18px;
}

.updateBtn {
  margin-right: 10px;
}

.updateBtn:hover, .addBtn:hover {
  font-size: 22px;
  color: white;
  background-color: green;
}

.cancelBtn {
  font-weight: bold;
  background-color: transparent;
  padding: 2px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 18px;
}

.cancelBtn:hover {
  font-size: 22px;
  color: white;
  background-color: rgb(175, 30, 30);
}

article {
  position: relative;
  width: 400px;
  margin: 20px auto;
  background-color: rgb(118, 250, 120);
  box-shadow: 5px 10px 8px #888888;
  overflow-wrap: break-word;
  padding: 5px;
}

article:nth-child(even) {
  transform: rotate(-1deg);
}

article:nth-child(4n+0) {
  transform: rotate(1deg);
}

article:nth-child(2n+0) {
  background-color: rgb(232, 229, 90);
}

article:nth-child(3n+0) {
  background-color: rgb(222, 137, 228);
}

.title {
  font-size: 20px;
  font-weight: 700;
  padding: 10px 30px 10px 10px;
}

.text {
  font-size: 20px;
  padding: 8px;
  padding: 10px 30px 10px 10px;
}
.deleteBtn {
  position: absolute;
  background-color: transparent;
  font-weight: bold;
  top: 5px;
  right: 5px;
  padding: 1px;
  font-size: 25px;
  border: none;
}

.deleteBtn:hover {
  color: white;
  background-color: rgb(175, 30, 30);
  cursor: pointer;
  font-size: 25px;
}

.editBtn {
  padding: 2px;
  font-weight: bold;
  background-color: transparent;
  font-size: 25px;
  border: none;
}

.editBtn:hover {
  color: white;
  font-size: 30px;
  cursor: pointer;
}

.addBtn:hover {
  cursor: pointer;
}

i {
  vertical-align: middle;
}

@media only screen and (max-width: 700px) {
  .container {
    max-width: 90%;
  }

  .add, .list {
    width: 90%;
  }

  article {
    width: 90%;
  }
}
</style>
