import mongoose from "mongoose";
import cities from "./cities.js";

import Property from "../models/Property.js";

mongoose.connect('mongodb://localhost:27017/real-estate');

mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Database connected");
});

const types = ["detached", "terraced", "bungalow", "park-home", "semi-detached", "flat", "farm-land"];

const saleOrRentOptions = ["for-sale", "to-rent"];

const detachedPhotos = [
    'https://images.unsplash.com/photo-1567002260893-954a299f8c6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1570127828934-c60aa3e1e5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
];

const terracedPhotos = [
    'https://images.unsplash.com/photo-1547638599-d4bf222cf5d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1570006876036-1a475a48a4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=674&q=80',
    'https://images.unsplash.com/photo-1618660920685-4505debb785a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
];

const bungalowPhotos = [
    'https://images.unsplash.com/photo-1642333943577-e043283363b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    'https://images.unsplash.com/photo-1550347795-72f008240a39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1624067111551-bc2340badc90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

];

const parkHomePhotos = [
    'https://images.unsplash.com/photo-1630437683041-d1b3e19a7c5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80',
    'https://images.unsplash.com/photo-1556738609-38bc26f37cec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    'https://images.unsplash.com/photo-1652946336807-bd35785ef268?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
];

const semiDetachedPhotos = [
    'https://images.unsplash.com/photo-1621983209359-456e234c892a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1621983209348-7b5a63f23866?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1621983209342-ebf870427308?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
];

const flatPhotos = [
    'https://images.unsplash.com/photo-1630699144867-37acec97df5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
];

const landPhotos = [
    'https://images.unsplash.com/photo-1635320587977-c4b3bd487bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1615138572681-6bdbffc8b130?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1694&q=80',
    'https://images.unsplash.com/photo-1560934983-850c3960e59e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
];

const sample = array => array[Math.floor(Math.random() * array.length)];

//TODO: function for property type and photos
function typesAndPhotos(){
    let x = sample(types);
    let y = [];
    if (x === "detached"){
        y = detachedPhotos;
    } else if (x === "terraced"){
        y = terracedPhotos;
    } else if (x === "bungalow"){
        y = bungalowPhotos;
    } else if (x === "park-home"){
        y = parkHomePhotos;
    } else if (x === "semi-detached"){
        y = semiDetachedPhotos;
    } else if (x === "flat"){
        y = flatPhotos;
    } else if (x === "farm-land"){
        y = landPhotos;
    };
    return [x, y];
};

function saleRentPrice(){
    let a = sample(saleOrRentOptions);
    let b = 0;
    if (a === "for-sale"){
        b = Math.floor((Math.random() * 1000000) + 1)
    } else if (a === "to-rent"){
        b = Math.floor((Math.random() * 2500) + 1)
    }
    return [a, b];
};

const seed = async () => {
    await Property.deleteMany({});
    for (let i = 0; i < 1000; i++) {
        const [x, y] = typesAndPhotos();
        const [a, b] = saleRentPrice();
        const home = new Property({
            location: `${sample(cities)}`,
            title: 'Property',
            saleOrRent: a,
            price: b,
            description: 'this is the default description',
            beds: Math.floor((Math.random() * 10) + 1),
            baths: Math.floor((Math.random() * 5) + 1),
            receptions: Math.floor((Math.random() * 3) + 1),
            type: x,
            photos: y,
        })
        await home.save();
    }
}

seed().then(() => {
    mongoose.connection.close();
})