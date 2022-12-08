const dotenv = require("dotenv");
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
// const csv = require('csv-parser');
const { REPL_MODE_SLOPPY } = require("repl");
dotenv.config({path:".env"});
var app = express();
app.use(bodyParser.urlencoded({extended:true}));

//DO NOT MODIFY ANY PART OF THIS CODE USELESS TOLD TO DO SO.
/*Add you connestion details to the env file*/
let dataSetPath = 'PRECON'
const readdir = (dirname) => {
    return new Promise((resolve, reject) => {
      fs.readdir(dirname, (error, filenames) => {
        if (error) {
          reject(error);
        } else {
          resolve(filenames);
        }
      });
    });
};

var connectionString = mysql.createConnection(
    {
        host:process.env.host,
        user: process.env.user,
        password:process.env.password,
        database:process.env.database
    }
);
async function reader(file)
{
    const results = [];
    return new Promise(function(resolve,reject){
        fs.createReadStream(file).pipe(csv()).on('data', (data) => results.push(data)).on('end', () => {
            resolve(results)
        })
    });
    
}



function seedData_batch(query,val) {
    /*
    Call this fuction to  insert a record into your db to the respective table using 
    the query.The variable query corresponds to the sql query you will write to accomplish this. 
     */
    connectionString.query(query,val,
        (err2, result) => {
            if (err2) {
                console.log("Seeding Failed");
                console.log(err2);
            }
            else {
                console.log("Seeding done");
            }
        });
}

function seedData(query)
{
    /*
    Call this fuction to  insert a record into your db to the respective table using 
    the query.The variable query corresponds to the sql query you will write to accomplish this. 
     */
    connectionString.query(query,
    (err2,result)=>
    {
        if(err2)
        {
            console.log("Seeding Failed");
            console.log(err2);
        }
        else
        {
            console.log("Seeding done");
        }
     });
}

connectionString.connect(async (err)=>
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        let hc_query =
        "INSERT INTO grp16_website.product ( product_id, product_name , price , product_image ,category,update_key ,active_bit) VALUES ('1','ndsjf','34','https://cdn.shopify.com/s/files/1/0347/0904/5292/files/ek0501_1_1_720x_2fc240cc-61df-4370-ad86-45734bf5699c_480x480.jpg?v=1618310069','male',1,1)";
  
      await seedData_batch(hc_query);
    }

connectionString.end();
});