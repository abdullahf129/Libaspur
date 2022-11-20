const dotenv = require("dotenv");
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const csv = require('csv-parser');
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
        ///////////////////////////////////////////////////////////////////////////////////////////////weather data
        let fileContentMeta = await reader('weatherData.csv')// a list to iterate over
        //console.log(fileContentMeta.length)
        //console.log(fileContentMeta)
        /* The file content from the metadata has been read for you here.
        You can write code over here to add the columns to your respective tables depending on
        your schema
        */
    //    var insertion_string1="INSERT INTO Weather_Data (Date  , Houroftheday  , temp  , feelslike  , dew	 , humidity  , precip  , precipprob  , preciptype  , snow	 , snowdepth	 , windgust	 , windspeed	 , winddir	 , sealevelpressure  	, cloudcover	 , visibility	 , solarradiation  , solarenergy  , uvindex  , severerisk  , conditions  , icon  , stations   ) VALUES(";
    //    size_weatherdata=fileContentMeta.length;
    //    console.log(size_weatherdata)

    //    for (let i = 0; i < size_weatherdata; i++) {
    //     var insertion_string1="INSERT INTO Weather_Data (Date  , Houroftheday  , temp  , feelslike  , dew	 , humidity  , precip  , precipprob  , preciptype  , snow	 , snowdepth	 , windgust	 , windspeed	 , winddir	 , sealevelpressure  	, cloudcover	 , visibility	 , solarradiation  , solarenergy  , uvindex  , severerisk  , conditions  , icon  , stations   ) VALUES(";
    //     my_dictionary=fileContentMeta[i];
    //     values =[]
    //     count=0
    //     for (const [key, value] of Object.entries(my_dictionary)) {

    //         console.log(key,value)
    //         if (/^\d+\.\d+$/.test(value)==true){
    //             values.push(value)
    //             count=count+1
    //             continue
  
    //         }
    //         else if (/^\d+$/.test(value)==true) {
    //             values.push(value)
    //             count=count+1
    //             continue                
    //         }
    //         else{
    //             string1=value
    //             new_string="\"" + string1 + "\""
    //             values.push(new_string)
    //             count=count+1
    //             continue
  
    //         }
    //         }
    //     //    console.log("before")
    //     //    console.log(values)
    //     //    var values = values.filter(function(v, i) {
    //     //     // check the index is odd
    //     //     return i % 2 != 0;
    //     //   });
    //       console.log("after")
    //       console.log(values)
    //       for (let i = 0; i < values.length; i++) {
    //         if (values[i]=='\"\"'){
    //             values[i]="Null"
    //         }
    //       }
    //       for (let i = 0; i < values.length; i++) {
    //         insertion_string1=insertion_string1+values[i]
    //         insertion_string1=insertion_string1+","
    //         insertion_string1=insertion_string1+" "
    //       }
    //       insertion_string1 = insertion_string1.substring(0, insertion_string1.length - 2);
    //       insertion_string1=insertion_string1+")"
    //       console.log(insertion_string1)
    //       await seedData(insertion_string1)
    //       console.log("working")

    //     }

        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////Metadata
        let fileContentWheater = await reader('Metadata.csv')
        //metadata related tables=4 House_extra_info House_rooms House_electrical_info House_member_info
        // var inserrtion_string1="INSERT INTO House_extra_info (House_num, Property_Area_sqft , No_of_Floors   , Building_Year   , Ceiling_Height_ft   , Ceiling_Insulation ) VALUES(";
        // var insertion_string2="INSERT INTO House_rooms(House_num   ,Total_No_of_Rooms   , Bedrooms   , Livingrooms   , Drawingrooms   , Kitchen ) VALUES(";
        // var insertion_string3="INSERT INTO House_electrical_info(House_num   ,Connection_Type   , No_of_Electronic_Devices   , No_of_ACs   , No_of_Refrigerators   , No_of_WashingMachines   , No_of_Fans   , No_of_Water_Dispensers   , No_of_Water_Pumps   , No_of_Electric_Heaters  , No_of_Irons   , No_of_Lighting_Devices   , No_of_UPS ) VALUES(";
        // var insertion_string4="INSERT INTO House_member_info (House_num   , No_of_People   , Adults_14_to_60    , Children_0_to_13   , Seniors   , Permanent_Residents   ,  Temporary_Residents ) VALUES(";   
       
        // list1=["Website Name","Property_Area_sqft","No_of_Floors","Building_Year","Ceiling_Height_ft","Ceiling_Insulation"]
        // list2=["Website Name","Total_No_of_Rooms","Bedrooms","Livingrooms","Drawingrooms","Kitchen"]
        // list3=["Website Name","Connection_Type","No_of_Electronic_Devices","No_of_ACs","No_of_Refrigerators","No_of_WashingMachines","No_of_Fans","No_of_Water_Dispensers","No_of _Water_Pumps","No_of_Electric_Heaters","No_of_Irons","No_of_Lighting_Devices","No_of_UPS"]
        // list4=["Website Name","No_of_People","Adults_14_to_60","Children_0_to_13","Seniors","Permanent_Residents","Temporary_Residents"]  

        // for (let i = 0; i < fileContentWheater.length; i++) {
        //     inserrtion_string1="INSERT INTO House_extra_info (House_num, Property_Area_sqft , No_of_Floors   , Building_Year   , Ceiling_Height_ft   , Ceiling_Insulation ) VALUES(";
        //     insertion_string2="INSERT INTO House_rooms(House_num   ,Total_No_of_Rooms   , Bedrooms   , Livingrooms   , Drawingrooms   , Kitchen ) VALUES(";
        //     insertion_string3="INSERT INTO House_electrical_info(House_num   ,Connection_Type   , No_of_Electronic_Devices   , No_of_ACs   , No_of_Refrigerators   , No_of_WashingMachines   , No_of_Fans   , No_of_Water_Dispensers   , No_of_Water_Pumps   , No_of_Electric_Heaters   ,No_of_Irons   , No_of_Lighting_Devices   , No_of_UPS ) VALUES(";
        //     insertion_string4="INSERT INTO House_member_info (House_num   , No_of_People   , Adults_14_to_60    , Children_0_to_13   , Seniors   , Permanent_Residents   ,  Temporary_Residents ) VALUES(";   
        //     my_dictionary=fileContentWheater[i];

        //     values1=[],values2=[],values3=[],values4=[]
        //         count=0
        //         for (const [key, value] of Object.entries(my_dictionary)) {
        
        //             console.log(key,value)
        //             if (key=="Website Name"){
        //                 middle = value.replace( /^\D+/g, '')
        //                 console.log('her i am')
        //                 console.log(middle)
        //                 values1.push(middle)
        //                 values2.push(middle)
        //                 values3.push(middle)
        //                 values4.push(middle)
        //                 count=count+1                   

        //             }
        //             if (/^\d+\.\d+$/.test(value)==true){
        //                 if (key!="Website Name"){ if (list1.includes(key)==true){values1.push(value)}  if (list2.includes(key)==true){values2.push(value)} if (list3.includes(key)==true){values3.push(value)} if (list4.includes(key)==true){values4.push(value)}}
        //                 count=count+1
        //                 continue
          
        //             }
        //             else if (/^\d+$/.test(value)==true) {
        //                 if (key!="Website Name"){ if (list1.includes(key)==true){values1.push(value)}  if (list2.includes(key)==true){values2.push(value)} if (list3.includes(key)==true){values3.push(value)} if (list4.includes(key)==true){values4.push(value)}}
        //                 count=count+1
        //                 continue                
        //             }
        //             else{
        //                 string1=value
        //                 new_string="\"" + string1 + "\""
        //                 if (key!="Website Name"){ if (list1.includes(key)==true){values1.push(new_string)}  if (list2.includes(key)==true){values2.push(new_string)} if (list3.includes(key)==true){values3.push(new_string)} if (list4.includes(key)==true){values4.push(new_string)}}
        //                 count=count+1
        //                 continue
          
        //                 }
        //             }

        // for (let i = 0; i < values1.length; i++) {
        //     if (values1[i]=='\"\"'){
        //         values1[i]="Null"
        //     }
        //   }

        //   for (let i = 0; i < values2.length; i++) {
        //     if (values2[i]=='\"\"'){
        //         values2[i]="Null"
        //     }
        //   }

        //   for (let i = 0; i < values3.length; i++) {
        //     if (values3[i]=='\"\"'){
        //         values3[i]="Null"
        //     }
        //   }

        //   for (let i = 0; i < values4.length; i++) {
        //     if (values4[i]=='\"\"'){
        //         values4[i]="Null"
        //     }
        //   }
        //   console.log(values1)
        //   console.log(values2)
        //   console.log(values3)
        //   console.log(values4)

        //   for (let i = 0; i < values1.length; i++) {
        //     inserrtion_string1=inserrtion_string1+values1[i]
        //     inserrtion_string1=inserrtion_string1+","
        //     inserrtion_string1=inserrtion_string1+" "
        //   }

        //   for (let i = 0; i < values2.length; i++) {
        //     insertion_string2=insertion_string2+values2[i]
        //     insertion_string2=insertion_string2+","
        //     insertion_string2=insertion_string2+" "
        //   }

        //   for (let i = 0; i < values3.length; i++) {
        //     insertion_string3=insertion_string3+values3[i]
        //     insertion_string3=insertion_string3+","
        //     insertion_string3=insertion_string3+" "
        //   }

        //   for (let i = 0; i < values4.length; i++) {
        //     insertion_string4=insertion_string4+values4[i]
        //     insertion_string4=insertion_string4+","
        //     insertion_string4=insertion_string4+" "
        //   }
        

        //   inserrtion_string1 = inserrtion_string1.substring(0, inserrtion_string1.length - 2);
        //   inserrtion_string1=inserrtion_string1+")"

        //   insertion_string2 = insertion_string2.substring(0, insertion_string2.length - 2);
        //   insertion_string2=insertion_string2+")"

        //   insertion_string3 = insertion_string3.substring(0, insertion_string3.length - 2);
        //   insertion_string3=insertion_string3+")"

        //   insertion_string4 = insertion_string4.substring(0, insertion_string4.length - 2);
        //   insertion_string4=insertion_string4+")"

        //   console.log(inserrtion_string1)
        //   console.log(insertion_string2)
        //   console.log(insertion_string3)
        //   console.log(insertion_string4)
        //   await seedData(inserrtion_string1)
        //   await seedData(insertion_string2)
        //   await seedData(insertion_string3)
        //   await seedData(insertion_string4)

        //    console.log("working")

        // }


        //console.log(fileContentWheater)
        /* The file content from the weatherData has been read for you here.
        You can write code over here to add the columns to your respective tables depending on
        your schema
        */
    //     let filenames = await readdir(dataSetPath);
    //     for(let file of filenames)
    //     {

    //     let fileContent = await reader(dataSetPath +"/"+ file)
    //     var insert_string1="INSERT INTO Total_usage_kw (House_num , Date , Houroftheday, Minutes, Usage_kw) VALUES(";
    //      my_list=[ "Date", "Hour of the day", "Minutes", "Usage_kW"]
    //     /* The file content from the metadata has been read for you here.
    //     You can write code over here to add the columns to your respective tables depending on
    //     your schema
    //     */
    //     size_file_data=fileContent.length;
    //    console.log(size_file_data)

    //    external_count=1
    //    for (let i = 0; i < size_file_data; i++) {
    //     if (external_count<1 && external_count>3) {break;}
    //     var insert_string1="INSERT INTO Total_usage_kw (House_num , Date , Houroftheday, Minutes, Usage_kw) VALUES(";
    //     my_dictionary=fileContent[i];
    //     values =[]
    //     count=0
    //     for (const [key, value] of Object.entries(my_dictionary)) {
    //         console.log(key,value)
    //         if (/^\d+\.\d+$/.test(value)==true){
    //             if (my_list.includes(key)==true){values.push(value)}
    //             count=count+1
    //             continue
  
    //         }
    //         else if (/^\d+$/.test(value)==true) {
    //             if (my_list.includes(key)==true){values.push(value)}
    //             count=count+1
    //             continue                
    //         }
    //         else{
    //             string1=value
    //             new_string="\"" + string1 + "\""
    //             if (my_list.includes(key)==true){values.push(new_string)}
    //             count=count+1
    //             continue
  
    //         }

    //         }
    //     //    console.log("before")
    //     //    console.log(values)
    //     //    var values = values.filter(function(v, i) {
    //     //     // check the index is odd
    //     //     return i % 2 != 0;
    //     //   });
    //       console.log("after")
    //       console.log(values)
    //       for (let i = 0; i < values.length; i++) {
    //         if (values[i]=='\"\"'){
    //             values[i]="Null"
    //         }
    //       }
    //       insert_string1=insert_string1+external_count+","
    //       for (let i = 0; i < values.length; i++) {
    //         insert_string1=insert_string1+values[i]
    //         insert_string1=insert_string1+","
    //         insert_string1=insert_string1+" "
    //       }
    //       insert_string1 = insert_string1.substring(0, insert_string1.length - 2);
    //       insert_string1=insert_string1+")"
    //       console.log(insert_string1)
    //       await seedData(insert_string1)
    //     console.log("working")
        

    //     }
        

    //         // console.log(fileContent)
    //         /*The file content from the 42 house*.csv files has been read for you here. 
    //         You can write code over here to add the columns to your respective tables depending on
    //          your schema*/ 
    //         // loop over each row and write an inser querry.
    //         //call seedData to insert a record into your db.
    //         external_count=external_count+1
    //     }
        
    //     connectionString.end();

    // }
    let fileContent = await reader("\PRECON\\House42.csv")
    // console.log(fileContent)
    /*The file content from the 42 house*.csv files has been read for you here. 
    You can write code over here to add the columns to your respective tables depending on
     your schema*/ 
    // loop over each row and write an inser querry.
    //call seedData to insert a record into your db.
    hc=[]
    console.group('here')           
    for (let i = 0; i < fileContent.length; i++) {
        let hc_temp = []
        //For House Consumption Table
        x = i + 1;
        
        a=12
        //console.log(a)
        hc_temp.push(42)

        let parts = fileContent[i]['Date'].split('/');

        hc_temp.push(parts[0])
        //console.log(fileContent[i]['Hour of the day'])
        hc_temp.push((fileContent[i]['Hour of the day']))
        hc_temp.push((fileContent[i]['Minutes']))
        hc_temp.push((fileContent[i]['AC_DR_kW']))
        hc_temp.push((fileContent[i]['UPS_kW']))
        hc_temp.push((fileContent[i]['LR_kW']))
        hc_temp.push((fileContent[i]['Kitchen_kW']))
        hc_temp.push((fileContent[i]['AC_Dr__kW']))
        hc_temp.push((fileContent[i]['AC_BR_kW']))
        hc_temp.push((fileContent[i]['Refrigerator_kW']))
        hc_temp.push((fileContent[i]['AC_LR_kW']))
        hc_temp.push((fileContent[i]['AC_kW']))
        hc_temp.push((fileContent[i]['AC_kW_1']))
        hc_temp.push((fileContent[i]['AC_MBR_kW']))
        hc_temp.push((fileContent[i]['WP_kW']))
        hc_temp.push((fileContent[i]['AC_BR_kW_2']))
        hc_temp.push((fileContent[i]['WD_kW']))
        hc_temp.push((fileContent[i]['AC_BR_kW_1']))
        hc_temp.push((fileContent[i]['BR_kW']))
        hc_temp.push((fileContent[i]['Laundary_kW']))
        hc_temp.push((fileContent[i]['AC_BR3_kW']))
        hc_temp.push((fileContent[i]['AC_BR2_kW']))
        hc_temp.push((fileContent[i]['AC_BR1_kW']))
        hc_temp.push((fileContent[i]['Non_UPS_kW']))
        hc_temp.push((fileContent[i][' AC_Reg_kW']))



        hc.push(hc_temp)

        //console.log(hc_temp)
    }
   // external_count=external_count+1
}
//(`website_name`,`date`,`hour_of_the_day`,`minutes`,`Usage_kW`)

let hc_query = "INSERT INTO Daily_appliace_usage(House_num  ,Date, Houroftheday  , Minutes  , AC_DR_kW  , UPS_kW  , LR_kW  , Kitchen_kW  , AC_Dr__kW  , AC_BR_kW  , Refrigerator_kW  , AC_LR_kW  , AC_kW  , AC_kW_1  , AC_MBR_kW  , WP_kW  , AC_BR_kW_2  , WD_kW   , AC_BR_kW_1  , BR_kW  , Laundary_kW  , AC_BR3_kW  , AC_BR2_kW  , AC_BR1_kW  , Non_UPS_kW  , AC_Reg_kW ) VALUES ?";
//Daily_appliace_usage(House_num  ,Date, Houroftheday  , Minutes  , AC_DR_kW  , UPS_kW  , LR_kW  , Kitchen_kW  , AC_Dr__kW  , AC_BR_kW  , Refrigerator_kW  , AC_LR_kW  , AC_kW  , AC_kW_1  , AC_MBR_kW  , WP_kW  , AC_BR_kW_2  , WD_kW   , AC_BR_kW_1  , BR_kW  , Laundary_kW  , AC_BR3_kW  , AC_BR2_kW  , AC_BR1_kW  , Non_UPS_kW  , AC_Reg_kW )";


await seedData_batch(hc_query, [hc])

connectionString.end();
});