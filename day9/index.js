const http = require("http");

let users = [
    {
        id: 1,
        name: "ahmed",
        age: 22,
    },
    {
        id: 2,
        name: "ali",
        age: 20,
    },
    {
        id: 3,
        name: "aya",
        age: 21,
    },
];

let posts = [
    {
        id: 1,
        text: "post1",
    },
    {
        id: 2,
        text: "post2",
    },
    {
        id: 3,
        text: "post3",
    },
];

const server = http.createServer((req, res) => {
    if (req.url === "/users" && req.method === "GET") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(users));
    } else if (req.url === "/users" && req.method === "POST") {
        req.on("data", (chunk) => {
            addedUser = JSON.parse(chunk);
            const exist = users.find((user) => user.id === addedUser.id);
            if (!exist) {
                users.push(addedUser);
                res.end("User added successfully");
            } else {
                res.end(`User has ID: ${addedUser.id} is already exist`);
            }
        });
    } else if (req.url === "/users" && req.method === "PUT") {
        req.on("data", (chunk) => {
            const updatedUser = JSON.parse(chunk);
            const index = users.findIndex((user) => user.id === updatedUser.id);
            if (index !== -1) {
                users[index] = { ...users[index], ...updatedUser };
                res.end(`User with ID: ${updatedUser.id} updated successfully`);
            } else {
                res.end(`User with ID: ${updatedUser.id} not found`);
            }
        });
    } else if (req.url === "/users" && req.method === "DELETE") {
        req.on("data", (chunk) => {
            const { id } = JSON.parse(chunk);
            const index = users.findIndex((user) => user.id === id);
            if (index !== -1) {
                users.splice(index, 1);
                res.end(`User with ID: ${id} deleted successfully`);
            } else {
                res.end(`User with ID: ${id} not found`);
            }
        });
    } else if (req.url === "/posts" && req.method === "GET") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(posts));
    } else if (req.url === "/posts" && req.method === "POST") {
        req.on("data", (chunk) => {
            addedPost = JSON.parse(chunk);
            const exist = posts.find((post) => post.id === addedPost.id);
            if (!exist) {
                posts.push(addedPost);
                res.end("Post added successfully");
            } else {
                res.end(`POST has ID: ${addedPost.id} is already exist`);
            }
        });
    } else if (req.url === "/posts" && req.method === "PUT") {
        req.on("data", (chunk) => {
            const updatedPost = JSON.parse(chunk);
            const index = posts.findIndex((post) => post.id === updatedPost.id);
            if (index !== -1) {
                posts[index] = { ...posts[index], ...updatedPost };
                res.end(`post with ID: ${updatedPost.id} updated successfully`);
            } else {
                res.end(`post with ID: ${updatedPost.id} not found`);
            }
        });
    } else if (req.url === "/posts" && req.method === "DELETE") {
        req.on("data", (chunk) => {
            const { id } = JSON.parse(chunk);
            const index = posts.findIndex((post) => post.id === id);
            if (index !== -1) {
                posts.splice(index, 1);
                res.end(`post with ID: ${id} deleted successfully`);
            } else {
                res.end(`post with ID: ${id} not found`);
            }
        });
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
