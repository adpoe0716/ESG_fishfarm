const express = require("express");
const cors = require("cors");
const app = express();
const sql = require("./sql");
const cron = require("node-cron");
const port = 3000;
app.use(cors());
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
///////////////////////////////////////////////////////////////////////////

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const options = {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
};
const insertData = async () => {
    let select = await sql.select("COUNT(sensor_id) AS num", `sensor`);
    // console.log(select);
    select = JSON.parse(select);
    let count = select[0].num;
    for (let i = 1; i <= 3; i++) {
        let t1, t2, p1, p2, s1, s2, o1, o2, v1, v2;
        if (i === 1) {
            t1 = 9;
            t2 = 45;
            p1 = 7;
            p2 = 10;
            s1 = 1;
            s2 = 108;
            o1 = 110;
            o2 = 250;
            v1 = 10;
            v2 = 15;
        } else if (i === 2) {
            t1 = 1;
            t2 = 41;
            p1 = 5;
            p2 = 9;
            s1 = 18;
            s2 = 25;
            o1 = 1;
            o2 = 25;
            v1 = 45;
            v2 = 50;
        } else {
            t1 = 22;
            t2 = 32;
            p1 = 7;
            p2 = 10;
            s1 = 10;
            s2 = 25;
            o1 = 1;
            o2 = 5;
            v1 = 10;
            v2 = 15;
        }

        const sensor_id = count + i;
        const sensor_num = i;
        const sensor_date = new Intl.DateTimeFormat('zh-TW', options)
            .format(new Date())
            .replace(/\//g, '-')
            .replace(',', '');
        const sensor_temperature = getRandomValue(t1, t2);
        const sensor_PH = getRandomValue(p1, p2);
        const sensor_salinity = getRandomValue(s1, s2);
        const sensor_oxygen = getRandomValue(o1, o2);
        const sensor_volume = getRandomValue(v1, v2);

        // console.log([
        //     sensor_id,
        //     sensor_num,
        //     sensor_date,
        //     sensor_temperature,
        //     sensor_PH,
        //     sensor_salinity,
        //     sensor_oxygen,
        //     sensor_volume,
        // ]);
        const columns =
            "`sensor_id`, `fishfarm_num`, `sensor_date`, `sensor_temperature`, `sensor_PH`, `sensor_salinity`, `sensor_oxygen`, `sensor_volume`";
        const values = [
            sensor_id,
            sensor_num,
            sensor_date,
            sensor_temperature,
            sensor_PH,
            sensor_salinity,
            sensor_oxygen,
            sensor_volume,
        ];
        const insert = await sql.insert("sensor", columns, values);
    }
};

// insertData();
// cron.schedule("*/30 * * * *", () => {
//     console.log("插");
//     insertData();
// });

process.stdin.resume();
app.get("/api/search/carbon", async (req, res) => {

    let select = await sql.select(
        "*, CONVERT_TZ(`carbon_day`, '+00:00', '+08:00') as local_time",
        "`carbon`",
        ""
    );

    res.send(select);
});


// app.post("/api/search/carbon", async (req, res) => {
//     const num = req.body.num;
//     console.log(num);
//     let select = await sql.select(
//     "*",
//     "`carbon`",
//     `WHERE \`carbon_num\` = ${num} AND \`co2\` IS NOT NULL`

//     )
// });


app.post("/api/search/sensor", async (req, res) => {
    const num = req.body.num;
    // console.log(req.body.num);
    let select = await sql.select(
        "*, CONVERT_TZ(`sensor_date`, '+00:00', '+08:00') as `sensor_date`",
        "`sensor`",
        `WHERE \`fishfarm_num\` = ${num} ORDER BY \`sensor_id\` DESC LIMIT 5`
    );

    // console.log(select);
    res.send(select);
});

app.post("/api/search/fishfarm", async (req, res) => {
    const num = req.body.num;
    let select = await sql.select("*", "fishfarm", `WHERE \`fishfarm_num\` = ${num} ORDER BY \`fishfarm_id\` DESC LIMIT 1`);
    res.send(select);
});

app.post("/api/Cal/input", async (req, res) => {
    const { num, results } = req.body;
    const carbon_day = new Intl.DateTimeFormat('zh-TW', options)
        .format(new Date())
        .replace(/\//g, '-')
        .replace(',', '');
    for (let i = 0; i < 3; i++) {
        let select = await sql.select("COUNT(carbon_id) AS num", `carbon`);
        console.log("yaa", req.body.Co2[0]);
        select = JSON.parse(select);
        let count = select[0].num;
        console.log("yaa2", count);
        const columns = [
            "`carbon_id`,`carbon_day`,`fishfarm_num`,`co2`"
        ]
        const values = [
            count + 1,
            carbon_day,
            i + 1,
            req.body.Co2[i],
        ]
        const insert = await sql.insert("carbon", columns, values);
    }
});



app.post("/api/login", async (req, res) => {
    const userAccount = req.body.name;
    const userPassword = req.body.pwd;
    console.log("Received Account:", userAccount);
    console.log("Received Password:", userPassword);

    try {
        const result = await sql.select("*", "user", `WHERE \`user_email\` = '${userAccount}' AND \`user_password\` = '${userPassword}'`);
        console.log("Received result:", result);

        // 確保 result 是一個有效的對象
        const user = Array.isArray(result) ? result[0] : JSON.parse(result)[0];
        console.log("Received User:", user);

        if (user) {
            const payload = {
                user_email: user.user_email,
                user_name: user.user_name,
                user_permissions: user.user_permissions,
                user_fishfarm_num : user.fishfarm_num,
                exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1小時
            };
            console.log(payload);
            const token = jwt.sign(payload, 'secret key');
            res.status(200).send({ status: true, message: '登入成功', token: token });
        } else {
            res.status(401).send({ status: false, message: '用戶名或密碼錯誤' });
        }
    } catch (err) {
        console.error("資料庫查詢錯誤：", err);
        res.status(500).json({ success: false, error: "登入失敗" });
    }
});

const jwt = require('jsonwebtoken');
const secretKey = 'secret key';  

app.get('/api/validateToken', (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];  // Bearer TOKEN_STRING
    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided." });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        // 如果需要，此处还可以添加更多的验证逻辑
        res.json({ success: true, user: decoded });
    } catch (error) {
        // 如果验证失败（例如，token 过期或签名错误）
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
});



app.post("/api/register", async (req, res) => {
    const name = req.body.user_name;
    const phone = req.body.user_phone;
    const address = req.body.user_address;
    const email = req.body.user_email;
    const pwd = req.body.user_pwd;
    const permissions = req.body.user_option;


    let user_id = await sql.select("COUNT(`user_id`) AS num", `user`);
    user_id = JSON.parse(user_id);
    id = user_id[0].num
    //console.log(id[0].num,name, phone, address, email, pwd, permissions);
    const columns = [
        "`user_id`, `user_name`, `user_email`, `user_password`, `user_phone`, `user_address`, `user_permissions`"
    ]
    const values = [
        id + 1,
        name,
        email,
        pwd,
        phone,
        address,
        permissions
    ]
    const insert = await sql.insert("user", columns, values);


});

app.post("/api/search/GPT", async (req, res) => {
    const question = req.body.Q;
    try {
        const response = await fetch("http://127.0.0.1:5000/gpt", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: question })
        });
        const responseData = await response.json();
        console.log(responseData);
        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

app.get("/api/weather", async (req, res) => {
    const request = require("request");
    request("http://127.0.0.1:5000/weather", function (error, response, body) {
        console.error("error:", error);
        console.log("statusCode:", response && response.statusCode);
        console.log("body:", body);
        const parsedBody = JSON.parse(body);
        res.send(parsedBody);
    });
});

app.listen(port, () => {
    console.log(`server listen http://localhost:${port}`);
});
