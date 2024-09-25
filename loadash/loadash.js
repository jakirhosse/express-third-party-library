// app.js
const express = require("express");
const _ = require("lodash");

const app = express();
app.use(express.json());

app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "John", age: 28 },
    { id: 2, name: "Jane", age: 34 },
    { id: 3, name: "Bob", age: 22 },
    { id: 4, name: "Alice", age: 30 },
  ];

  // ৩০ বছর বা তার বেশি বয়সের ইউজার ফিল্টার করা
  const filteredUsers = _.filter(users, (user) => user.age >= 30);

  res.json(filteredUsers);
});

app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "John", age: 28, email: "john@example.com" },
    { id: 2, name: "Jane", age: 34, email: "jane@example.com" },
    { id: 3, name: "Bob", age: 22, email: "bob@example.com" },
    { id: 4, name: "Alice", age: 30, email: "alice@example.com" },
  ];

  // প্রতিটি ইউজার থেকে email প্রপার্টি বাদ দেয়া
  const usersWithoutEmail = _.map(users, (user) => _.omit(user, ["email"]));

  res.json(usersWithoutEmail);
});

app.get("/api/merge", (req, res) => {
  const object1 = {
    id: 1,
    name: "John",
    details: { age: 28, city: "New York" },
  };
  const object2 = { details: { age: 30, country: "USA" }, job: "Engineer" };

  // object1 এবং object2 মিশ্রিত করে একটি নতুন অবজেক্ট তৈরি করা
  const mergedObject = _.merge(object1, object2);

  res.json(mergedObject);
});

app.get("/api/count", (req, res) => {
  const numbers = [1, 2, 3, 4, 3, 2, 3, 1, 3];

  // ৩ সংখ্যাটি কতবার আছে তা গণনা করা
  const count = _.countBy(numbers)[3] || 0;

  res.json({ count });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
