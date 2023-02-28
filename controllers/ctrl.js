const items = require("../data/items");
const uuid  = require("uuid");

const getItems =   (req,reply) =>  {
    reply.send(items); 
};
const getOneItems =  (req,reply) => {
    const {id} = req.params;
    const item = items.find((item) => item.id === parseInt(id));
    reply.send(item);
};


const addItem = async (req,reply) => {
    const {text,desc} = req.body;
    const itemToAdd = {
        id : uuid.v4(),
        text : text,
        desc : desc
    }

   const addedItem = await items.push(itemToAdd);
    reply.code(201).send(itemToAdd);
}

const deleteOneItem = (req,reply) => {
    const id = parseInt(req.params.id);
    const found = items.some((item) => item.id === id);
    if (!found){
        return reply.send({message : "No item found to delete"})
    }else {
        const NewItems = items.filter((item) => item.id !== id);
        reply.send({message : "item deleted "});
    }
}

const updateItem = (req,reply) => {
    const id = parseInt(req.params.id);
    const {text,desc} = req.body;

    const state = items.some(item => item.id === id);
    if(!state){
        return reply.send({text : "no item found" , desc : "no item found"});
    }else{
        const index = items.findIndex(item => item.id === id);
        items[index].text = text;
        items[index].desc = desc;
        let updatedItem = items[index];
        reply.code(200).send(updatedItem); 
    }
} 

module.exports = {
    getItems,
    getOneItems,
    addItem,
    deleteOneItem,
    updateItem
}