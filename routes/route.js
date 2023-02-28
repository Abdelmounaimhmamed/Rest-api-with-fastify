const {getItems,getOneItems,addItem,deleteOneItem,updateItem} = require("../controllers/ctrl");

const updateItemOpt = {
    schema : {
        body: {
            type : "object",
            required : ['text' , 'desc'],
            properties : {
                text : {type : "string"},
                desc : {type : "string"},
            }
        },
        response : {
            200 : {
                type : "object",
                properties : {
                    text : {type : "string"},
                    desc : {type : "string"},
                }
            }
        }
    },
    handler : updateItem,
}

const deleteItemopt = {
    schema : {
        response : {
            200 : {
                type : "object",
                properties : {
                    message :  {type : "string"},
                }
            }
        }
    },
    handler : deleteOneItem
}

const addOneItem = {
    schema : {
        body : {
            type : "object",
            required : ['text','desc'],
            properties : {
                text : {type : "string"},
                desc : {type : "string"}
            }
        },
        response : {
            201 : {
                type : "object" ,
                properties : {
                    id : {type : "string"},
                    text : {type : "string"},
                    desc : {type : "string"}
                }
            }
        }
    },
    handler : addItem
}

const getItemsOpt = {
    // validation of what we get back 
    schema : {
        response : {
            200 : {
                type : "array",
                items : {
                    type : "object",
                    properties : {
                        id : {type : "integer"},
                        text : {type : "string"},
                        desc : {type : "string"}
                    }
                }
            }
        }
    },
    handler : getItems,
}
const getOneItem = {
    schema : {
        response : {
            200 : {
                // we add the type and items when we have an array . 
                   type : "object",
                   properties : {
                    id : {type : "string"},
                    text :  {type : "string"},
                    desc : {type : "string"}
                   }
                }
        }
    },
    handler : getOneItems
}


function itemRoute(fastify , options , done){

    fastify.get("/items" ,getItemsOpt);

    fastify.get("/items/:id" ,getOneItem);

    fastify.post("/items" , addOneItem);

    fastify.delete("/items/:id" , deleteItemopt)
    
    fastify.put("/items/:id" , updateItemOpt);
    done();
}

module.exports = itemRoute;