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
  password: "server",
  database: "grp16_website",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const name = req.body.name;
  const address = req.body.address;
  const number = req.body.number;
  const update_key = 0;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO customer (cust_id, password,email_id,name,house_adress,phone,update_key) VALUES (?,?,?,?,?,?,?)",
      [username, hash, email, name, address, number, update_key],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send({ message: "Registration unsuccessful, an error occured" });
        }
        res.send({ message: "Registered successfully" });
      }
    );
  });
});

app.get("/loginadmin", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
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
            res.send({ message: "Welcome Admin" });
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
  const newpassword = req.body.newpassword;

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
            [hash, username],
            (err, result) => {
              if (err) {
                console.log("error occured");
              } else {
                console.log("notjing");
              }
            }
          );
          res.send({ message: "Successfully changes" });
        } else {
          res.send({ message: "User doesn't exist" });
        }
      });
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
            res.send({ message: "Welcome customer" });
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
  const productcategory = req.body.prodcat;
  const product_id = req.body.prodid;
  const productimage = req.body.prodimg;
  const update_key = 0;
  const active_bit = 1;

  db.query(
    "INSERT INTO products (product_id, product_name , price , product_image ,category,update_key ,active_bit) VALUES (?,?,?,?,?,?,?)",
    [
      product_id,
      productname,
      price,
      productimage,
      productcategory,
      update_key,
      active_bit,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Product addition unsuccessful, an error occured",
        });
      }
      res.send({ message: "Product added successfully" });
    }
  );
  db.query(
    "INSERT INTO inventory (product_id, quantity,category,update_key,active_bit) VALUES (?,?,?,?,?)",
    [product_id, stock, productcategory, update_key, active_bit],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Product addition unsuccessful, an error occured",
        });
      }
      res.send({ message: "Product added successfully" });
    }
  );
});

app.post("/removeprod", (req, res) => {
  const product_id = req.body.prodid;
  const update_key = 0;
  const active_bit = 0;

  db.query(
    "UPDATE products SET update_key=?, active_bit=? WHERE product_id=?",
    [update_key, active_bit, product_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "Product removal unsuccessful, an error occured" });
app.post("/insertreview", (req, res) => {
  const username = req.body.username;
  const sentence = req.body.sentence;

  db.query(
    "INSERT INTO review (user_id, statement) VALUES (?,?)",
    [username, sentence],
    (err, result) => {
      if (err) {
        res.send({ message: "unsuccessful" });
      }
<<<<<<< Updated upstream
      res.send({ message: "Product removed successfully" });
    }
  );
  db.query(
    "UPDATE inventory SET update_key=?, active_bit=? WHERE product_id=?",
    [update_key, active_bit, product_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "Product removal unsuccessful, an error occured" });
      }
      res.send({ message: "Product removed successfully" });
=======
      res.send({ message: "successfully entered" });
>>>>>>> Stashed changes
    }
  );
});

app.post("/modprod", (req, res) => {
  const productname = req.body.prodname;
  const price = req.body.prodprice;
  const stock = req.body.prodstock;
  const productcategory = req.body.prodcat;
  const product_id = req.body.prodid;
  const productimage = req.body.prodimg;
  const update_key = 1;
  const active_bit = 1;
<<<<<<< Updated upstream

  db.query(
    "UPDATE products SET product_name=? , price=? , product_image=? ,category=?,update_key=? ,active_bit=? WHERE product_id=?",
    [
      productname,
      price,
      productimage,
      productcategory,
      update_key,
      active_bit,
      product_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Product Modification unsuccessful, an error occured",
        });
      }
      res.send({ message: "Product modified successfully" });
    }
  );
  db.query(
    "UPDATE inventory SET quantity=?,category=?,update_key=?,active_bit=? WHERE product_id=?",
    [stock, productcategory, update_key, active_bit, product_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Product modification unsuccessful, an error occured",
        });
      }
      res.send({ message: "Product modified successfully" });
    }
  );
});

app.post("/homepage", (req, res) => {
  db.query("select product_image from products", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
=======
>>>>>>> Stashed changes

  db.query(
    "UPDATE products SET product_name=? , price=? , product_image=? ,category=?,update_key=? ,active_bit=? WHERE product_id=?",
    [
      productname,
      price,
      productimage,
      productcategory,
      update_key,
      active_bit,
      product_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Product Modification unsuccessful, an error occured",
        });
      }
      res.send({ message: "Product modified successfully" });
    }
  );
  db.query(
    "UPDATE inventory SET quantity=?,category=?,update_key=?,active_bit=? WHERE product_id=?",
    [stock, productcategory, update_key, active_bit, product_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Product modification unsuccessful, an error occured",
        });
      }
      res.send({ message: "Product modified successfully" });
    }
  );
});

app.post("/addcat", (req, res) => {
  const categoryname = req.body.category;
  const update_key = 0;
  const active_bit = 1;

  db.query(
    "INSERT INTO category ( category_name, update_key, active_bit) VALUES (?,?,?)",
    [categoryname, update_key, active_bit],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Category addition unsuccessful, an error occured",
        });
      }
      res.send({ message: "Category added successfully" });
    }
  );
});

app.get("/checkout", (req, res) => {
  res.send("Done!");
  // if (req.session.user) {
  //   res.send({ loggedIn: true, user: req.session.user });
  // } else {
  //   res.send({ loggedIn: false });
  // }
});

//( cust_id varchar(200) Primary Key, product_id varchar(255),order_id varchar(255), quantity varchar(255),data varchar(255),total_cost double ,update_key int,active_bit int)"
app.post("/checkout", (req, res) => {
  // const username = req.body.username;   //same variable names which we'll use in front end so it fetches them from front end
  // const productid = req.body.productid;
  // const orderid=req.body.orderid
  // const quantity=req.body.quantity
  // const data=req.body.data  //actually means date, but spelling mistake in schema table so followed it
  // const totalcost=req.body.totalcost
  // const update_key=0
  // const active_bit=1

  //appending order history

  db.query(
    `SELECT * FROM shopping_cart WHERE shoppingcart_id=${shopping_cart}`,
    (err, result) => {
      console.log(result);

      db.query(
        "INSERT INTO order_history (cust_id, shoppingcart_id, product_id, order_id, quantity, NOW(), total_cost,update_key, active_bit) VALUES (?,?,?,?,?,?,?,?)",
        [
          result.cust_id,
          result.shoppingcart_id,
          result.product_id,
          orderid,
          result.quantity,
          result.data,
          result.total_cost,
          result.update_key,
          result.active_bit,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            res.send({ message: "Order could not be placed" });
          }
          res.send({ message: "Order has been shipped" });
        }
      );

      //subtracting from inventory
      //accessing quantity of product in inventory and doing minus 1
      const newquantity = 0;
      db.query(
        "SELECT quantity FROM inventory WHERE product_id = ?;",
        result.product_id,
        (err, result) => {
          if (err) {
            res.send({ err: err });
          }
          newquantity = result - 1;
        }
      );
      //updating old value in database to new one
      db.query(
        "UPDATE inventory SET quantity = ? WHERE product_id = ?;"[
          (newquantity, result.product_id)
        ]
      );

      //making shopping cart inactive since it is now empty because order has been shipped

      db.query(
        "SELECT active_bit FROM shopping_cart WHERE shoppingcart_id = ?;",
        result.shoppingcart_id,
        (err, result) => {
          if (err) {
            res.send({ err: err });
          }
          result.active_bit = 0;
        }
      );
    }
  );
});

app.get("/stock", (req, res) => {
  db.query(
    "SELECT product_id,quantity , FROM inventory where quantity<5;",
    (err, results, fields) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

//Add to cart function
app.post("/addtocart", (req, res) => {
  db.query(
    `SELECT * FROM inventory WHERE product_id = $(inventory)`,
    (err, result) => {
      {
        if (err) {
          console.log(err);
        }
      }
      db.query(
        "INSERT INTO cart (product_id, quantity, customer_id, update_key, active_bit) VALUES (?,?,?,?,?)",
        [product_id, quantity, customer_id, update_key, active_bit],
        (err, result) => {
          if (err) {
            console.log(err);
            res.send({
              message: "Product addition unsuccessful, an error occured",
            });
          }
          res.send({ message: "Product added successfully" });
        }
      );
    }
  );
});

//Send cart data to cart page
app.post("/cart_gallery", (req, res) => {
  try {
    db.query("select product_id from cart", (err, result) => {
      if (err) {
        console.log({ err: err });
      }
      // console.log(result);
      var arr = [];
      for (var i = 0; i < result.length; i++) {
        arr.push(result[i]);
      }
      res.send({ result: arr });
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.listen(3002, () => {
  console.log("running server");
});

app.post("/gallery", (req, res) => {
  try {
    db.query("select product_image from product", (err, result) => {
      if (err) {
        console.log({ err: err });
      }
      // console.log(result);
      var arr = [];
      for (var i = 0; i < result.length; i++) {
        arr.push(result[i].product_image);
      }

      res.send({ result: arr });
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post("/search", (req, res) => {
  const { searchData } = req.body;
  // console.log("------------------", searchData);
  // res.send("Hello");
  // const search = req.body.search;
  db.query(
    "SELECT * FROM product WHERE category=?",
    [searchData],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      var arr = [];
      for (var i = 0; i < result.length; i++) {
        arr.push(result[i].product_image);
      }
      res.send({ result: arr });
    }
  );
});
