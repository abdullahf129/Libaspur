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


app.post("/addprod", (req, res) => {
  const productname = req.body.prodname;
  const price = req.body.prodprice;
  const stock = req.body.prodstock;
  const productcategory=req.body.prodcat
  const product_id=req.body.prodid
  const productimage=req.body.prodimg
  const update_key=0
  const active_bit=1

    db.query(
        "INSERT INTO products (product_id, product_name , price , product_image ,category,update_key ,active_bit) VALUES (?,?,?,?,?,?,?)",
        [product_id, productname,price, productimage, productcategory, update_key, active_bit],
        (err, result) => {
          if (err){
          console.log(err);
          res.send({message:"Product addition unsuccessful, an error occured"})
          }
          res.send({message:"Product added successfully"})
        }
    );
    db.query(
      "INSERT INTO inventory (product_id, quantity,category,update_key,active_bit) VALUES (?,?,?,?,?)",
      [product_id, stock,productcategory,update_key,active_bit],
      (err, result) => {
        if (err){
        console.log(err);
        res.send({message:"Product addition unsuccessful, an error occured"})
        }
        res.send({message:"Product added successfully"})
      }
  );

}


);


app.post("/removeprod", (req, res) => {

  const product_id=req.body.prodid
  const update_key=0
  const active_bit=0

    db.query(
        "UPDATE products SET update_key=?, active_bit=? WHERE product_id=?",
        [update_key, active_bit, product_id],
        (err, result) => {
          if (err){
          console.log(err);
          res.send({message:"Product removal unsuccessful, an error occured"})
          }
          res.send({message:"Product removed successfully"})
        }
    );
    db.query(
      "UPDATE inventory SET update_key=?, active_bit=? WHERE product_id=?",
      [update_key, active_bit, product_id],
      (err, result) => {
        if (err){
        console.log(err);
        res.send({message:"Product removal unsuccessful, an error occured"})
        }
        res.send({message:"Product removed successfully"})
      }
    );

    


}

);

app.listen(3002, () => {
  console.log("running server");
});