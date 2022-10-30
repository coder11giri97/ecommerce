/**
 * this file have db related configs
 */

module.exports ={
   HOST : "localhost",
   USER : "root",
   PASSWORD : "apple@17",
   DB : "ecom_db",
   dialect:"mysql",
   pool :{
       max : 5, // maximum connections possible at any time
       min : 0,  // minimum connections possible
       acquire : 30000,   // wait for 300000 ms before aborting a connection
       idle : 1000        // if there is no request for next 1000 ms , the connection thread will be released
   }
}