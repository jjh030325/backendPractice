const express = require("express");
const dbConnect = require("./config/dbConnect");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));

app.use(methodOverride("_method"));

dbConnect();

app.get("/", (req, res) => {
    res.send("Hello, Node!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/contacts", require("./routes/contactRoutes"));

app.listen(3000, () => {
    console.log("서버 실행 중");
})

//post = 서버로 정보를 보냄
//put = 기본 정보 수정
//delete = 서버 정보 삭제