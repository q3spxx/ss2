'use strict'
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');
// db.run("CREATE TABLE pricePolicy (name TEXT, priceGroup TEXT)")
// //db.run("DROP TABLE test3")
// db.run("DELETE FROM schedule WHERE rowid=3")
// db.run("ALTER TABLE schedule ADD sortId INT")
// db.run("INSERT INTO data (name, value) VALUES ('price', '[]')")
// db.run("UPDATE data SET value='[2, 5]' WHERE name='price'")
// db.run("ALTER TABLE schedule ADD sessions TEXT");
db.all("SELECT rowid, * FROM movies", function (err, rows) {
 	console.log(rows)
})

// // db.serialize(function() {
// //   	//db.run("CREATE TABLE test3 (info TEXT, lol INT)");
// //  	db.run("ALTER TABLE test3 DROP COLUMN e");
// //  	//db.run("INSERT INTO test3 (c) VALUES (32)")
// //   // var stmt = db.prepare("INSERT INTO test VALUES (?)");
// //   // for (var i = 0; i < 10; i++) {
// //   //     stmt.run("Ipsum " + i);
// //   // }
// //   // stmt.finalize();
 
// //   db.each("SELECT * FROM test3", function(err, row) {
// //       console.log(row);
// //   });
// // });
 
// db.close();