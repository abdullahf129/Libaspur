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

var c1 = "create table grp16_website.customer( cust_id varchar(200) Primary Key, password varchar(255), email_id varchar (200), name varchar(200), house_adress varchar(255),phone varchar(255),update_key int)";

var a1 = "create table grp16_website.store_admin( ID varchar(200) Primary Key, password varchar(255))"

var s1 = "create table grp16_website.product( product_id varchar(200) UNIQUE, product_name varchar(255) not null, price varchar(255) not null, product_image varchar(255),category varchar(255) KEY,update_key int,active_bit int)"

var inven = "create table grp16_website.inventory( product_id varchar(200) Primary Key, quantity int, category varchar(255),update_key int,active_bit int, Foreign Key (product_id) references grp16_website.product(product_id))"

var shop = "create table grp16_website.shopping_cart( shoppingcart_id varchar(200) Primary Key,cust_id varchar(200) UNIQUE, product_id varchar(255), quantity int,total_cost double ,update_key int,active_bit int, Foreign Key (product_id) references grp16_website.product(product_id))"

var current_order = "create table grp16_website.current_order( cust_id varchar(200) UNIQUE, product_id varchar(255), order_id int not null AUTO_INCREMENT Primary Key,order_status varchar(255), quantity int ,update_key int,active_bit int, Foreign Key (cust_id) references grp16_website.shopping_cart(cust_id), Foreign Key (product_id) references grp16_website.product(product_id))"

var order_history = "create table grp16_website.order_history( cust_id varchar(200) Primary Key,shoppingcart_id varchar(200), product_id varchar(255),order_id int, quantity int,data date ,total_cost double ,update_key int,active_bit int, Foreign Key (cust_id) references grp16_website.current_order(cust_id), Foreign Key (product_id) references grp16_website.product(product_id), Foreign Key (order_id) references grp16_website.current_order(order_id))"

var password = "create table grp16_website.password_reset( cust_id varchar(200) Primary Key, password varchar(255),sec_ques varchar(255),update_key int,active_bit int,Foreign Key (cust_id) references grp16_website.customer(cust_id))"

var category = "create table grp16_website.category(category_name varchar(255) Primary Key,update_key int,active_bit int,Foreign Key (category_name) references grp16_website.product(category))"

var sales = "create table grp16_website.sales(date date,amount double,update_key int,active_bit int)"


var i1= "insert into grp16_website.store_admin values('abdullah','$2b$10$vyI6pWhW0NtWdvmfDLeIle3o.PiArrFMh/JHmUZk2tEr705fqibaG')"
var i2= "insert into grp16_website.product values('1','abc','100','https://media.istockphoto.com/id/1180368192/photo/indian-bridegroom-wears-ethnic-or-traditional-cloths.jpg?s=612x612&w=is&k=20&c=OIsuOBbGxODCW-L2eREtWJnGhHaZR9rVUZp2ml433c0=','abcefg','0','1')"
var i3= "insert into grp16_website.inventory values('1','100','abcefg','0','1')"

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
                    // await createTable(i1)
                    await createTable(s1)
                    await createTable(inven)
                    await createTable(shop)
                    await createTable(current_order)
                    await createTable(order_history)
                    await createTable(password)
                    await createTable(category)
                    await createTable(sales)
                    console.log("All tables created");


                    await createTable(i1) // admin entry added
                    console.log("Admin entry added")
                    await createTable(i2) // product entry added
                    await createTable(i3) // inventory entry added
               
                        try {
                            //call create table here using await like done below here.
                            //await createTable()
                            connectionString.query("INSERT INTO grp16_website.product(product_id, product_name, price, product_image, category, update_key, active_bit) VALUES('2', 'ndsjf', '34', 'https://cdn.shopify.com/s/files/1/0347/0904/5292/files/ek0501_1_1_720x_2fc240cc-61df-4370-ad86-45734bf5699c_480x480.jpg?v=1618310069', 'male', 1, 1)");
                        }
                        catch (err) {
                            console.log(err);
                        }

                }
                catch(err)
                {
                    // err=str
                    //var str=err.sqlMessage
                    //if (str.includes("already exists"))
                    //    console.log("Nothing to worry about, table(s) already exist")
                    //else
                    //    console.log(err)
                    console.log(err)
                }
                connectionString.end();
            }
        })
    }
    else {
        console.log("Connection failed");
        console.log(error);
    }
})
    



//   var shop =
//   "create table grp16_website.shopping_cart( cust_id varchar(200) Primary Key, product_id varchar(255), quantity varchar(255),total_cost double ,update_key int,active_bit int)";
// var curennt_order =
//   "create table grp16_website.current_order( cust_id varchar(200) Primary Key, product_id varchar(255),order_id varchar(255),order_status varchar(255), quantity varchar(255) ,update_key int,active_bit int)";
// var order_history =
//   "create table grp16_website.order_history( cust_id varchar(200) Primary Key, product_id varchar(255),order_id varchar(255), quantity varchar(255),data varchar(255),total_cost double ,update_key int,active_bit int)";
// var password =
//   "create table grp16_website.password_reset( cust_id varchar(200) Primary Key, password varchar(255),sec_ques varchar(255),update_key int,active_bit int)";
// connectionString.connect((error) => {
//   if (!error) {
//     console.log("Connection has been established");
//     connectionString.query(
//       `CREATE DATABASE IF NOT EXISTS ${process.env.database}`,
//       async (err2, result) => {
//         if (err2) {
//           console.log(err2);
//         } else {
//           console.log("Database Created");
//           try {
//             //call create table here using await like done below here.
//             await createTable(c1);
//             await createTable(a1);
//             await createTable(i1);
//             await createTable(s1);
//             await createTable(inven);
//             await createTable(shop);
//             await createTable(curennt_order);
//             await createTable(order_history);
//             await createTable(password);
//             console.log("All tables created");
//           } catch (err) {
//             // err=str
//             var str = err.sqlMessage;
//             if (str.includes("already exists"))
//               console.log("Nothing to worry about, table(s) already exist");
//             else console.log(err);
//           }

//           /*
//                 Here you will be calling the createTable function to create each table passing the above created
//                 variable as a paramter to the function.
//                 */
//           connectionString.end();
//         }
//       }
//     );
//   } else {
//     console.log("Connection failed");
//     console.log(error);
//   }
// });
