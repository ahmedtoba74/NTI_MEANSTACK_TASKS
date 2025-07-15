import express from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
});

mongoose
    .connect("mongodb://localhost:27017/NTI")
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => console.log(err));

const userModel = new mongoose.model("User", userSchema);

const app = express();

app.use(express.json());

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json({ message: "Done", users });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

const addUser = async (req, res) => {
    try {
        const addedUser = await userModel.insertMany(req.body);
        res.json({ message: "Done", data: addedUser });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            req.body,
            { new: true }
        );

        if (!updatedUser)
            return res.status(404).json({ message: "User not found" });

        res.json({ message: "User updated", user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findByIdAndDelete(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User Deleted", user });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

app.route("/users").get(getUsers).post(addUser);
app.route("/users/:id").put(updateUser).delete(deleteUser);

let users = [
    { name: "ahmed", age: 22, id: 1 },
    { name: "ali", age: 21, id: 2 },
    { name: "aya", age: 20, id: 3 },
];

let posts = [
    { id: 1, title: "post1", text: "text1" },
    { id: 2, title: "post2", text: "text2" },
    { id: 3, title: "post3", text: "text3" },
];

app.get("/posts", (req, res) => {
    res.json({ message: "Done", postss });
});

app.put("/posts/:id", (req, res) => {
    const index = posts.findIndex((post) => post.id == req.params.id);
    if (index !== -1) {
        posts[index] = { ...posts[index], ...req.body };
        res.json({ message: "Updated Done" });
    } else {
        res.end(`post with ID: ${req.params.id} not found`);
    }
});

app.delete("/posts/:id", (req, res) => {
    const index = posts.findIndex((post) => post.id == req.params.id);
    if (index !== -1) {
        posts.splice(index, 1);
        res.json({ message: "Deleted Done" });
    } else {
        res.end(`post with ID: ${req.params.id} not found`);
    }
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});
