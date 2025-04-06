const mongoose = require('mongoose');


const getConnection = async () => {

    try {
        const url = 'mongodb://MMUNOZAC:asTb2aF7gyLBrAAM@cluster0-shard-00-00.h5puc.mongodb.net:27017,cluster0-shard-00-01.h5puc.mongodb.net:27017,cluster0-shard-00-02.h5puc.mongodb.net:27017/peliculas?ssl=true&replicaSet=atlas-12mq17-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
        
        // 'mongodb+srv://usuarioiud:uuqacX6oJV0kVtE9@ac@test-cluster.8o3ccjs.mongodb.net/ing-web-inv?retryWrites=true&w=majority&appName=test-cluster'


        await mongoose.connect(url);

        console.log('conexion exitosa');

    } catch(error) {
        console.log(error);   
    }
}
    
    module.exports = {
        getConnection,
    }


