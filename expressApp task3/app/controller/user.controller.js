const DealWithJson = require("../helper/dealWithJson.helper")

class User{
    static add = (req, res)=> {
        res.render("add", {
            pageTitle: "add User"
        })
    }

    static addLogic = (req, res)=>{
        const userData = {id: Date.now(), ...req.body }
        const allUsers = DealWithJson.readFromJSON()
        allUsers.push(userData)
        DealWithJson.writeToJSON(allUsers)
        res.redirect("/")
    }

    static showavailable = (req,res)=>{
        let allUsers = DealWithJson.readFromJSON()
        allUsers= allUsers.filter(u=> u.status == "available")

        if(req.query.searchKey){
            allUsers = allUsers.filter( u=> u.name.includes(req.query.searchKey))
        }

        res.render("available", {
            pageTitle: "available products",
            allUsers,
            hasUsers: allUsers.length
        })
    }


    static showunavailable = (req,res)=>{
        let allUsers = DealWithJson.readFromJSON()
        allUsers= allUsers.filter(u=> u.status == "unavailable")


        if(req.query.searchKey){
            allUsers = allUsers.filter( u=> u.name.includes(req.query.searchKey))
        }

        res.render("unavailable", {
            pageTitle: "unavailable products",
            allUsers,
            hasUsers: allUsers.length
        })
    }



    

    static showAll = (req,res)=>{
        let allUsers = DealWithJson.readFromJSON()
        // console.log(allUsers)
        if(req.query.searchKey){
            allUsers = allUsers.filter( u=> u.name.includes(req.query.searchKey))
        }
        res.render("home", {
            pageTitle: "All Users",
            allUsers,
            hasUsers: allUsers.length
        })
    }
    static showSingle = (req, res)=> {
        const id = req.params.userId
        const allUsers = DealWithJson.readFromJSON()
        const index = allUsers.findIndex( user => user.id == id )
        if(index == -1 ) res.send("user not found")
        res.render("show", {
            pageTitle: "Single User",
            product: allUsers[index]
        })
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
    static del = (req, res)=> {
        const id = req.params.userId
        const allUsers = DealWithJson.readFromJSON()
        const index = allUsers.findIndex( user => user.id == id )
        if(index == -1 ) res.send("user not found")
        allUsers.splice(index, 1)
        DealWithJson.writeToJSON(allUsers)
        res.redirect("/")
    }

    static makeunavailable=(req,res)=>{
        console.log("d5lt")
        const id = req.params.userId
        const allUsers = DealWithJson.readFromJSON()
        const index = allUsers.findIndex( user => user.id == id )
        allUsers[index].status="unavailable"
        DealWithJson.writeToJSON(allUsers)
        res.redirect("/")

    }

    static makeavailable=(req,res)=>{
        console.log("d5lt")
        const id = req.params.userId
        const allUsers = DealWithJson.readFromJSON()
        const index = allUsers.findIndex( user => user.id == id )
        allUsers[index].status="available"
        DealWithJson.writeToJSON(allUsers)
        res.redirect("/")

    }
}

module.exports = User