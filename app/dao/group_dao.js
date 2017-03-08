var group 		= require("../model/group")
var nodeMaria 	= require("node-mariadb")

//hs readable configuration. 
var connection = nodeMaria.createConnection({
	driverType: nodeMaria.DRIVER_TYPE_HANDLER_SOCKET,
	host: 'localhost',
	port: 9998
})
 
connection.on('erorr', function(err){
	console.log(err)
	process.exit(1)
})
 
connection.on('connect', function(){
 
 //write 
 	### Basic find.
	connection.openIndex('CTU', 'employee', nodeMaria.HandlerSocket.PRIMARY, ['id', 'name', 'age']
  , function(err, hs){
    hs.find([1], {limit:1},function(err, data){
      console.log(data);   =>  [{id: '1', name: 'jack', age: '40'}]
    });
  });
 
 
  ### Find with in clause
  connection.openIndex('CTU', 'employee', nodeMaria.HandlerSocket.PRIMARY, ['id', 'name', 'age'], ['id']
  , function(err, hs){
    hs.find({in: [1, 2, 3]}, {limit: 3}, function(err, data){
      console.log(data);   =>  [{id: '2', name: 'Tonny', age: '38'}, .... ]
    });
  });
 
 
  ### Find with filter
  connection.openIndex('CTU', 'employee', 'age', ['id', 'name', 'age'], ['age']
  , function(err, hs){
    hs.find([26], {operator: '>', limit:5, filter:['age', '<=', 28]}, function(err, data){
      console.log(data);   =>  [{id: '2', name: 'Chloe', age: '35'}, ..... ]
    });
  });

  //read
  ### Insert
  connection.openIndex('CTU', 'employee', nodeMaria.HandlerSocket.PRIMARY, ['id', 'name', 'age']
  , function(err, hs){
    hs.insert([10, 'Edgar', 35],function(err, data){
      console.log(data);   => true
    });
  });
 
 
  ### Update
  connection.openIndex('CTU', 'employee', nodeMaria.HandlerSocket.PRIMARY, ['id', 'name', 'age'], ['id']
  , function(err, hs){
    hs.update([12], {set:[12, 'Bill', 50]}, function(err, affectedNum){
      console.log(affectedNum);   =>  1
    });
  });
  
  ### Delete
  connection.openIndex('CTU', 'employee', nodeMaria.HandlerSocket.PRIMARY, ['id']
  , function(err, hs){
    hs.delete([1], function(err, affectedNum){
      console.log(affectedNum);   =>  1
    });
  });

  
});



