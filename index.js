const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

//Anslutning till MongoDB+Atlas med Mongoose
const url = 'mongodb+srv://joba1905:jy5lu2a@webbutveckling.lpwkyx4.mongodb.net/dt162g_projekt';
mongoose.connect(url, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

//Hantering vid anslutning
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function (callback) {

    //Mongoose-schema för vad varje ny post ska innehålla
    const postSchema = mongoose.Schema({
        postTitle: String,
        postText: String,
    }, {versionKey: false});

    //Databasmodell med schema
    const Post = mongoose.model('Post', postSchema)

    //Hämta alla poster som finns lagrade i DB
    app.get('/posts', function (req, res) {

        Post.find(function(err, posts) {
            if(err) return console.error(err);
            var jsonStr = JSON.stringify(posts);
            res.send(jsonStr);
        });
    })

    //Lägg till ny att-göra post på listan
    app.post('/posts', function(req, res) {
        var newPost = new Post({ 
            postTitle: req.body.postTitle,
            postText: req.body.postText
        });	

        newPost.save(function(data) {
            var data = JSON.stringify(newPost);
            res.contentType('application/json');
            res.send(data);
            console.log("Ny post skapad!");
        });
    });

    //Radera post med id
    app.delete('/posts/:id', function (req, res) {
        var id = req.params.id;
        Post.deleteOne({"_id": id}, function(data) {
            res.contentType('application/json');
            res.send(data);
            console.log("Post raderad!");
        });
    })

    //Uppdatera post med id
    app.put('/posts/:id', function(req, res) {
        var id = req.params.id;
        Post.findByIdAndUpdate(req.params.id, 
        {postTitle:req.body.postTitle, postText:req.body.postText}, function(data) {
            res.contentType('application/json');
            res.send(data);
            console.log("Post uppdaterad!");
        });  
    });
});


const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})