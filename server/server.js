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
cron.schedule("*/30 * * * *", () => {
    console.log("插");
    insertData();
});

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
            count+1,
            carbon_day,
            i+1,
            req.body.Co2[i],
        ]
        const insert = await sql.insert("carbon", columns, values);
    }
});


// app.get("/api/search/sensor", async (req, res) => {
//     let select = await sql.select(
//         "*, CONVERT_TZ(`sensor_time`, '+00:00', '+08:00') as local_time",
//         "`sensor`",
//         "ORDER BY local_time DESC LIMIT 5"
//     );
//     res.send(select);
// });

app.post("/api/search/login", (req, res) => {
    const data1 = req.body.name;
    const data2 = req.body.pwd;

    // console.log("1", data1);
    // console.log("2:", data2);

    Pool.query(
        "SELECT * FROM `user` WHERE `user_account` = ? AND `user_password` = ?",
        [data1, data2],
        (err, rows) => {
            if (!err) {
                if (rows && rows.length > 0) {
                    console.log(rows[0]["user_name"], "歡迎登入~");
                    return res.json({
                        success: true,
                        user: rows[0]["user_id"],
                        name: rows[0]["user_name"],
                    });
                } else {
                    console.log("Login failed: Account or password incorrect");
                    return res.json({ success: false });
                }
            } else {
                console.log("Error:", err);
                return res
                    .status(500)
                    .json({ success: false, error: "Internal Server Error" });
            }
        }
    );
});

app.post("/api/search/register", (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const email = req.body.email;
    const pwd = req.body.pwd;
    const permissions = req.body.permissions;
    console.log(name, phone, address, email, pwd, permissions);
    let perm;
    if (permissions == "訪客") perm = 1;
    else perm = 0;

    Pool.query(
        "SELECT COUNT(DISTINCT user_id) AS num_users FROM user",
        (error, results, fields) => {
            if (error) throw error;
            let id_num = results[0].num_users + 1;
            const sql =
                "INSERT INTO `user` (`user_id`, `user_name`, `user_account`, `user_password`, `user_phone`, `user_address`, `user_permissions`) VALUES (?, ?, ?, ?, ?, ?, ?)";
            Pool.query(
                sql,
                [id_num, name, email, pwd, phone, address, perm],
                (error, results, fields) => {
                    if (error) throw error;
                    console.log("User inserted successfully");

                    return res.json({ success: true });
                }
            );
        }
    );
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
