const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Col61513",
  database: "grp16_website",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email=req.body.email
  const name=req.body.name
  const address=req.body.address
  const number=req.body.number
  const update_key=0

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO customer (cust_id, password,email_id,name,house_adress,phone,update_key) VALUES (?,?,?,?,?,?,?)",
      [username, hash,email,name,address,number,update_key],
      (err, result) => {
        if (err){
        console.log(err);
        res.send({message:"Registration unsuccessful, an error occured"})

        }
        res.send({message:"Registered successfully"})
      }
    );
  });
});

app.get("/loginadmin", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } 
  else {
    res.send({ loggedIn: false });
  }
});

app.post("/loginadmin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM store_admin WHERE ID = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send({message:"Welcome Admin"});

          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.post("/changepassword", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newpassword=req.body.newpassword

  db.query(
    "SELECT * FROM customer WHERE email_id = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      
    bcrypt.hash(newpassword, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

      if (result.length > 0) {
        db.query(
          "UPDATE customer SET password= ? WHERE email_id= ?;",
          [hash,username],
          (err, result) => {
            if (err){
            console.log("error occured");      
            }
            else {
              console.log('notjing')
            }
          }
        )
          res.send({message:"Successfully changes"})

      }
       else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});
});



app.get("/logincustomer", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});
app.post("/logincustomer", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM customer WHERE cust_id = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send({message:"Welcome customer"});

          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.post("/insertreview", (req, res) => {
  const username = req.body.username;
  const sentence = req.body.sentence;

    db.query(
      "INSERT INTO review (user_id, statement) VALUES (?,?)",
      [username, sentence],
      (err, result) => {
        if (err){
        res.send({message:"unsuccessful"})

        }
        res.send({message:"successfully entered"})
      }
    );
});

app.listen(3002, () => {
  console.log("running server");
});

app.post("/homepage", (req, res) => {
  db.query("select product_image from products", (err, result) => {
    if (err) {
      console.log({ message: "kdjlfakjkljaklfj" });
    }
    console.log(result);
    res.send({ result});
  });
});
