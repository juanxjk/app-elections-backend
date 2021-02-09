import app from "./App";

if (process.env.NODE_ENV === "development")
  console.log(`Attention! Dev mode: ${process.env.NODE_ENV}`);

console.log("- - - - - - - - - - - - - - - - - - - - - - -");
app.start();
console.log("- - - - - - - - - - - - - - - - - - - - - - -");
