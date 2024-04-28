import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const salt = 10;

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin:["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials:true
}));


const db = mysql.createConnection({
    host: "localhost",
    user: "21510021",
    password: "1234",
    database: "assignment1"
})

const verifyUser = (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "You are not authenticated"});
    }
    else{
        jwt.verify(token, "jwt-secret-key", (err, decoded)=>{
            if(err){
                return res.json("Token is not okay.")
            }else{
                req.name = decoded.name;
                next();
            }
        })
    }
}
app.get('/logout',verifyUser,(req, res)=>{
    return res.json({status:"Success", name: req.name});
})

app.post('/register', (req, res)=>{
    const sql = "INSERT INTO login1(`name`,`email`,`password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash)=>{
        if(err) return res.json({Error: "Error for hashing the password"});
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err, result)=>{
            if(err) return res.json({Error: "Inserting data error in server."})
            return res.json({Status:"Success"})
        })
    })
})

app.post('/login', (req, res)=>{
    const sql = 'SELECT * FROM login1 WHERE email = ?';
    db.query(sql, [req.body.email], (err, data)=>{
        if(err){
            return res.json({Error:"Login error in server"});
        }
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response)=>{
                if(err) return res.json({Error: "Password compare error"});
                if(response){
                    const name = data[0].name;
                    const token = jwt.sign({name},"jwt-secret-key", {expiresIn:'1d'});
                    res.cookie('token', token);
                    return res.json({Status:"Success"}) 
                }else{
                    return res.json({Error:"Password not matched"});
                }
            });
        }
        else{
            return res.json({Error: "No email existed"});
        }
    })
})

app.get('/logout', (req, res)=>{
    res.clearCookie('token');
    return res.login({Status:"Success"});
})

app.listen(8081, ()=>{
    console.log("Server running....");
})