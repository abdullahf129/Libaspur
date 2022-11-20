var express = require('express');
const dotenv = require("dotenv");
const mysql = require('mysql');
const bodyParser = require('body-parser')
dotenv.config({path:".env"});
// const { promisify } = require("util");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3001, function () {
  console.log('Example app listening on port 3000!');
});




/*
//DO NOT MODIFY ANY PART OF THIS CODE USELESS TOLD TO DO SO.
*/ 
/*Add you connestion details to the env file*/

var connectionString = mysql.createConnection(
    {
        host:process.env.host,
        user: process.env.user,
        password:process.env.password
    }
);
// function createTable(CreateQuerry)
// {
//     console.log(CreateQuerry)
//     /*
//     The function is responsible for creating tables in your database. Do not modify it.

//     */
//    return new Promise((resolve, reject)=>{
//     connectionString.query(CreateQuerry,
//         (err,result)=>
//         {
//             if(err)
//             {
//                 console.log("Table creation failed");
//                 reject(err);
//             }
//             else
//             {
//                 console.log("Table created");
//                 resolve()
//                 //console.log(result);
//             }
//         });

//    });
// }
    


// const createTablePromised = promisify(createTable)

/*
    Here you will be writing your create table queries and storing them in a const variable.

*/


// var sql="CREATE TABLE grp16_website.Store_admin (House_num INT, Date date, Houroftheday INT, Minutes INT, Usage_kw REAL,PRIMARY KEY (House_num,Date,Houroftheday,Minutes),INDEX date_hour_idx (date ASC, Houroftheday ASC)VISIBLE)";
// var sql2="CREATE TABLE 24100119_PRECON.House_extra_info (House_num INT, Property_Area_sqft REAL, No_of_floors INT, Building_Year INT, Ceiling_Height_ft REAL, Ceiling_Insulation VARCHAR(255),PRIMARY KEY (House_num),FOREIGN KEY (House_num) REFERENCES House_member_info(House_num))";
// var sql3="CREATE TABLE 24100119_PRECON.House_rooms(House_num INT,Total_No_of_Rooms INT, Bedrooms INT, Livingrooms INT, Drawingrooms INT, Kitchen INT,PRIMARY KEY (House_num),FOREIGN KEY (House_num) REFERENCES House_electrical_info(House_num))";
// var sql4="CREATE TABLE 24100119_PRECON.House_electrical_info(House_num INT,Connection_Type VARCHAR(255), No_of_Electronic_Devices INT, No_of_ACs INT, No_of_Refrigerators INT, No_of_WashingMachines INT, No_of_Fans INT, No_of_Water_Dispensers INT, No_of_Water_Pumps INT, No_of_Electric_Heaters INT,No_of_Irons INT, No_of_Lighting_Devices INT, No_of_UPS INT,PRIMARY KEY (House_num),FOREIGN KEY (House_num) REFERENCES Total_usage_kw(House_num))";
// var sql5="CREATE TABLE 24100119_PRECON.House_member_info (House_num INT, No_of_People INT, Adults_14_to_60 INT , Children_0_to_13 INT, Seniors INT, Permanent_Residents INT,  Temporary_Residents INT,PRIMARY KEY (House_num),FOREIGN KEY (House_num) REFERENCES House_rooms(House_num))";
// var sql6="CREATE TABLE 24100119_PRECON.Weather_Data(Date date, Houroftheday INT, temp REAL, feelslike REAL, dew	REAL, humidity REAL, precip REAL, precipprob REAL, preciptype VARCHAR(255), snow	REAL, snowdepth	REAL, windgust	REAL, windspeed	REAL, winddir	INT, sealevelpressure REAL	, cloudcover	REAL, visibility	REAL, solarradiation REAL, solarenergy REAL, uvindex INT, severerisk REAL, conditions VARCHAR(255), icon VARCHAR(255), stations  VARCHAR(255),PRIMARY KEY (Date, Houroftheday),FOREIGN KEY (Date, Houroftheday) REFERENCES Total_usage_kw(Date, Houroftheday))";
// var sql7="CREATE TABLE 24100119_PRECON.Daily_appliace_usage(House_num INT, Date date, Houroftheday INT, Minutes INT, AC_DR_kW REAL, UPS_kW REAL, LR_kW REAL, Kitchen_kW REAL, AC_Dr__kW REAL, AC_BR_kW REAL, Refrigerator_kW REAL, AC_LR_kW REAL, AC_kW REAL, AC_kW_1 REAL, AC_MBR_kW REAL, WP_kW REAL, AC_BR_kW_2 REAL, WD_kW REAL , AC_BR_kW_1 REAL, BR_kW REAL, Laundary_kW REAL, AC_BR3_kW REAL, AC_BR2_kW REAL, AC_BR1_kW REAL, Non_UPS_kW REAL, AC_Reg_kW REAL,PRIMARY KEY (House_num,Date,Houroftheday,Minutes),FOREIGN KEY (House_num,Date,Houroftheday,Minutes) REFERENCES Total_usage_kw(House_num,Date,Houroftheday,Minutes))";
// var general="set global max_allowed_packet=1000000000;"

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
                    // await createTable(sql)
                    // await createTable(sql7)
                    // await createTable(sql4)
                    // await createTable(sql3)
                    // await createTable(general)
                    // await createTable(sql5)
                    // await createTable(sql2)
                    //await createTable(general)
                }
                catch(err)
                {
                    console.log(err)
                }
                

                /*
                Here you will be calling the createTable function to create each table passing the above created 
                variable as a paramter to the function.
                */
                connectionString.end();
            }
        });
    }
    else
    {
        console.log("Connection failed");
        console.log(error);
    }
});

app.post('/post', function (req, res) {
  res.send('Hello World!');
});