const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors');

mongoose.connect('mongodb://localhost/MyDataBase', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.json())
app.use(cors())
const port = 3000;


const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const User = mongoose.model('Users', UserSchema);

(async () => {

    app.get('/users', async (req, res) => { 
        const users = await User.find({});
        if (users) {
            res.status(200).send(users);
        } else {
            res.status(404).send({ msg: "Not Found" });
        }
    });

    app.get('/users/:id', async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ msg: "Not Found" });
        }
    });

    app.put('/users/:_id', async (req, res) => {
        const user = await User.findById(req.body._id);
        if (user) {
            user.name = req.body.name;
            user.age = req.body.age;
            await user.save();
            res.status(200).send({ msg: "user was update" });
        } else {
            res.status(404).send({ msg: "Not Found" });
        }
    });

    app.post('/users', async (req, res) => { 
        console.log("post");
        console.log(req.body);
        const user = new User();
        user.name = req.body.name;
        user.age = req.body.age;
        await user.save();
        res.status(200).send({ msg: "user was create" });
    });

    app.delete('/users/:id', async (req, res) => { 
        let user = null;
        if (req.params.id.length === 24) {
            user = await User.findById(req.params.id);
        }
        if (user) {
            await user.delete();
            res.status(200).send({ msg: "User was remove" });
        } else {
            res.status(404).send({ msg: "Not Found" });
        }
    });
})();

app.listen(port, () => {
    console.log(`Сервер был запущен: http://localhost:${port}\n`);
});
