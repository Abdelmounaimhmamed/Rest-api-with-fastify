const fastify = require("fastify")({logger : true});
const items = require("./data/items");
const Port = process.env.PORT || 5000;
const itemRoute = require("./routes/route");

// register the route : 
fastify.register(itemRoute);



const start = async () => {
    try {
        await fastify.listen(Port , () => {
            console.log(`App runniing on Port ${Port}`);
        })
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}


start();