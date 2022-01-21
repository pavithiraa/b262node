console.log("hello guys");


const marks=[40,50,60,70];
console.log(Math.max(...marks));
//Few objects N/A - document,window in node js
//global objects available in node js, Eg:
console.log(global);

// create package.json-npm init

//to create cmd apps
function double(num){
    return num*2;
}
console.log(process.argv);// process is the inbuild to access the comment line arguments
const num=process.argv[2];//command line tool is cretaed.
console.log("the doubled number is:" ,double(num));
//to create the in-built packages in node js,the syntax is,(the old way):


const os=require('os');
//it returns the amount of free system memory in bytes.
console.log("Free Memory:"+os.freemem());
//it returns the total amount of system memory in bytes.
console.log("Free Memory:"+os.totalmem());
console.log(os.arch());

//inbuilt memory in nodejs (fs) =>file system
//renaming file ,accessing  files
const fs=require("fs");
fs.readFile("./nice.txt","utf-8",(err,data)=>{
    console.log(data );
})
// Task
// Add Good night
// copy this content to another file good.txt
// rename the good.txt - awesome.txt

//ANS:(writeFile - overwrite,rename,copyFile)
// fs.appendFile("./nice.txt","good night","utf-8",(err,data)=>{
//     console.log("Updated!")
// })
// fs.copyFile("./nice.txt", "./good.txt", () => {
//     console.log("Copied Successfully!");
//   });
//   fs.rename("./good.txt","./awesome.txt",()=>{
//       console.log("file renamed!")
//   })
//   //async - call stack-> webapi(complete reading)->callback Q->
//   //Event Loop ->call stack
//   const data=fs.readFileSync("./nice.txt","utf8");
//   console.log(data);