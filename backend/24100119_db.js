const dotenv = require("dotenv");
const mysql = require("mysql");
// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
dotenv.config({ path: ".env" });
const { promisify } = require("util");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

/*
//DO NOT MODIFY ANY PART OF THIS CODE USELESS TOLD TO DO SO.
*/
/*Add you connestion details to the env file*/

var connectionString = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});
function createTable(CreateQuerry) {
  console.log(CreateQuerry);
  /*
    The function is responsible for creating tables in your database. Do not modify it.

    */
  return new Promise((resolve, reject) => {
    connectionString.query(CreateQuerry, (err, result) => {
      if (err) {
        console.log("Table creation failed");
        reject(err);
      } else {
        console.log("Table created");
        resolve();
        //console.log(result);
      }
    });
  });
}

// const createTablePromised = promisify(createTable)

/*
    Here you will be writing your create table queries and storing them in a const variable.

*/

var c1 ="create table grp16_website.customer( cust_id varchar(200) Primary Key, password varchar(255), email_id varchar (200), name varchar(200), house_adress varchar(255),phone varchar(255),update_key int)";

var a1= "create table grp16_website.admin( admin_id varchar(200) Primary Key, password varchar(255))"
var i1= "insert into grp16_website.admin values('abdullah','$2b$10$vyI6pWhW0NtWdvmfDLeIle3o.PiArrFMh/JHmUZk2tEr705fqibaG')"
var s1= "create table grp16_website.product( product_id varchar(200) Primary Key, product_name varchar(255) not null, price varchar(255) not null, product_image varchar(255),category varchar(255),update_key int,active_bit int,prod_image varchar(255))"
var inven= "create table grp16_website.inventory( product_id varchar(200) Primary Key, quantity int, category varchar(255),update_key int,active_bit int)"
var shop= "create table grp16_website.shopping_cart( shoppingcart_id varchar(200) Primary Key,cust_id varchar(200) Primary Key, product_id varchar(255), quantity int,total_cost double ,update_key int,active_bit int)"
var curennt_order= "create table grp16_website.current_order( cust_id varchar(200) Primary Key, product_id varchar(255),order_id varchar(255) not null AUTO_INCREMENT,order_status varchar(255), quantity int ,update_key int,active_bit int)"
var order_history="create table grp16_website.order_history( cust_id varchar(200) Primary Key,shoppingcart_id varchar(200), product_id varchar(255),order_id varchar(255), quantity int,data date ,total_cost double ,update_key int,active_bit int)"
var password="create table grp16_website.password_reset( cust_id varchar(200) Primary Key, password varchar(255),sec_ques varchar(255),update_key int,active_bit int)"
connectionString.connect( (error)=>
{
    if(!error)
    {
        console.log("Connection has been established");
        connectionString.query(`CREATE DATABASE IF NOT EXISTS ${process.env.database}`, async (err2,result) =>
        {
            if(err2)
            {
                console.log(err2);
            }
            else
            {
                console.log("Database Created");
                try{
                    //call create table here using await like done below here.
                    // await createTable(c1)
                    // await createTable(a1)
                    //await createTable(i1)
                    await createTable(s1)
                    await createTable(inven)
                    await createTable(shop)
                    await createTable(curennt_order)
                    await createTable(order_history)
                    await createTable(password)
                    console.log("All tables created");
                }
                catch(err)
                {
                    // err=str
                    var str=err.sqlMessage
                    if (str.includes("already exists"))
                        console.log("Nothing to worry about, table(s) already exist")
                    else
                        console.log(err)
                }
            }
        })
    }
})
    



  var shop =
  "create table grp16_website.shopping_cart( cust_id varchar(200) Primary Key, product_id varchar(255), quantity varchar(255),total_cost double ,update_key int,active_bit int)";
var curennt_order =
  "create table grp16_website.current_order( cust_id varchar(200) Primary Key, product_id varchar(255),order_id varchar(255),order_status varchar(255), quantity varchar(255) ,update_key int,active_bit int)";
var order_history =
  "create table grp16_website.order_history( cust_id varchar(200) Primary Key, product_id varchar(255),order_id varchar(255), quantity varchar(255),data varchar(255),total_cost double ,update_key int,active_bit int)";
var password =
  "create table grp16_website.password_reset( cust_id varchar(200) Primary Key, password varchar(255),sec_ques varchar(255),update_key int,active_bit int)";
connectionString.connect((error) => {
  if (!error) {
    console.log("Connection has been established");
    connectionString.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.database}`,
      async (err2, result) => {
        if (err2) {
          console.log(err2);
        } else {
          console.log("Database Created");
          try {
            //call create table here using await like done below here.
            await createTable(c1);
            await createTable(a1);
            await createTable(i1);
            await createTable(s1);
            await createTable(inven);
            await createTable(shop);
            await createTable(curennt_order);
            await createTable(order_history);
            await createTable(password);
            console.log("All tables created");
          } catch (err) {
            // err=str
            var str = err.sqlMessage;
            if (str.includes("already exists"))
              console.log("Nothing to worry about, table(s) already exist");
            else console.log(err);
          }

          /*
                Here you will be calling the createTable function to create each table passing the above created
                variable as a paramter to the function.
                */
          connectionString.end();
        }
      }
    );
  } else {
    console.log("Connection failed");
    console.log(error);
  }
});
