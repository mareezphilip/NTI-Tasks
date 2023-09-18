const mongoose = require("mongoose")
const validator = require("validator")

const ProductModel = mongoose.model("product" , {
   
    name:{
        type:String,
        trim:true,
        
    },
    parcode:{
        type:String,
       
    },
    description:{
        type:String,
    
    },
    price:{
        type:Number
    },
    priceafterdesc:{
      type:Number
    },
    status:{
        type:String
    }


})


module.exports = ProductModel