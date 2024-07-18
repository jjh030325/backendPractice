// HTTP 모듈로 서버 만들고 실행하기 (결과 비교 파일 : 04\results\server-1.js)

const http = require("http");

const server = http.createServer((req, res) => {
    console.log("요청 발생");
});

server.listen(3000, () => {
    console.log("서버가 실행 중");
});