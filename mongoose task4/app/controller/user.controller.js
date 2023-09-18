const DealWithJson = require("../helper/dealWithJson.helper")
const con =require("../db/connect")
const productmodel = require("../db/models/productmodel")


class User{
    static add = (req, res)=> {
        res.render("add", {
            pageTitle: "add User"
        })
    }

    static addLogic = async(req, res)=>{
        try{
            const product = new productmodel(req.body)
            console.log(req.body)
            const result = await product.save()
            console.log(result)
            res.redirect("/")
         }
         catch(e){
             res.render("add" , {
                 errors:e.errors,
                 pageTitle:"add User Error",
                 productdata:req.body
             })
     
         }
    }

    static showavailable = async(req,res)=>{
        try{

            let available = await productmodel.find({status:"available"})

            if(req.query.searchKey){
                available = await productmodel.find({name: {"$regex": req.query.searchKey , "$options": "i" }})
                let addedobj = await productmodel.find({parcode:req.query.searchKey})
                console.log(addedobj)
                addedobj.forEach(o => {
                    console.log("ana gwa el foreach")
                    if(!available.length) {available.push(o)}   
                    else{
                        available.forEach(u=> {
                            if(u._id != o._id) {available.push(o)}
                        })
                    }    
                })
                
                
             }

           // console.log(available)
            res.render("available", {
               pageTitle: "unavailable products",
               available,
               hasproduct: available.length
           })
   
           }
           catch(e){
              res.send(e)
           }
    }


    static showunavailable = async(req,res)=>{
       
        try{

         let unavailable = await productmodel.find({status:"unavailable"})

         if(req.query.searchKey){
            unavailable = await productmodel.find({name: {"$regex": req.query.searchKey , "$options": "i" }})
            let addedobj = await productmodel.find({parcode:req.query.searchKey})
            console.log(addedobj)
            addedobj.forEach(o => {
                console.log("ana gwa el foreach")
                if(!unavailable.length) {unavailable.push(o)}   
                else{
                    unavailable.forEach(u=> {
                        if(u._id != o._id) {unavailable.push(o)}
                    })
                }    
            })
            
            
         }

         //console.log("unavailable")
         res.render("unavailable", {
            pageTitle: "unavailable products",
            unavailable,
            hasproduct: unavailable.length
        })

        }
        catch(e){
           res.send(e)
        }

       
    }



    

    static showAll = async(req,res)=>{
       try{
          let products = await productmodel.find()

          
          if(req.query.searchKey){
            products = await productmodel.find({name: {"$regex": req.query.searchKey , "$options": "i" }})
            let addedobj = await productmodel.find({parcode:req.query.searchKey})
            console.log(addedobj)
            addedobj.forEach(o => {
                console.log("ana gwa el foreach")
                if(!products.length) {products.push(o)}   
                else{
                    products.forEach(u=> {
                        if(u._id != o._id) {products.push(o)}
                    })
                }    
            })
            
            
         }

          res.render("home", {
            pageTitle: "All Users",
            products,
            hasproduct: products.length
        })
       }
    
       catch(e){
         res.send(e.message)
       }
        
    }
    static showSingle = async(req, res)=> {
        
        try{
            const id = req.params.userId
            console.log(id)
            const product = await productmodel.findById(id)
            console.log(product)
            res.render("show", {
                pageTitle: "Single User",
                product
            })
        }
        catch(e){
          res.send(e.message)
        }
        
    }
    static edit = (req, res)=> {
        const id = req.params.userId
        const allUsers = DealWithJson.readFromJSON()
        const index = allUsers.findIndex( user => user.id == id )
        if(index == -1 ) res.send("user not found")
        res.render("edit",  {
            pageTitle: "edit User",
            userData: allUsers[index],
            isActive: allUsers[index].status=='Active'
        })
    }
    static editLogic = (req,res)=>{
        const id = req.params.userId
        const allUsers = DealWithJson.readFromJSON()
        const index = allUsers.findIndex( user => user.id == id )
        if(index == -1 ) res.send("user not found")
        allUsers[index]= {id, ...req.body}
        DealWithJson.writeToJSON(allUsers)
        res.redirect("/")
    }
    static del = async(req, res)=> {
        try{
            const id = req.params.userId
            await productmodel.findByIdAndRemove(id)
            res.redirect("/")
        }
        catch(e){
           res.send(e)
        }
       
        
        
    }

    static makeunavailable=async(req,res)=>{
        console.log("d5lt")
        

        try{
            const id = req.params.userId
            //const p = await productmodel.findById(id)
            //console.log("product" + p)
          
           // const newobj ={ ...p._doc, status:"unavailable" }
           // res.send(newobj)
            const result =await productmodel.findByIdAndUpdate(id,{status:"unavailable"})
            res.redirect("/")
        }
        catch(e){
           res.send(e)
        }

       
        

    }

    static makeavailable=async(req,res)=>{
        try{
            const id = req.params.userId
            ///const p = await productmodel.findById(id)
            //console.log("product" + p)
          
            //const newobj ={ ...p. , status:"available" }
            
            //res.send(newobj)
            const result =await productmodel.findByIdAndUpdate(id,{status:"available"})
            res.redirect("/")
        }
        catch(e){
           res.send(e)
        }

    }
}

module.exports = User