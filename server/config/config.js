//CONFIG
//Aqui de declararán las variables globales

//------------------------
//  Puerto
//------------------------

process.env.PORT = process.env.PORT || 8080;

//------------------------
//  Prevent App crashing
//------------------------

process.on('uncaughtException', function (error) {
    console.log(error.stack);
 });