let tablecontent = document.querySelector("#tablecontent")
users = []
headers=["id" , "name" , "username" , "email" , "phone" , "website" ,"address"  ]
const apiURL = "https://jsonplaceholder.typicode.com/users"
fetch(apiURL).then(res=>{res.json().then(response =>{
    users=response
    console.log(users)
    drawdata(users)
    
    
} )


})
.catch(err => console.log(err))


const createMyOwnEle = function(parent, ele, txt, classes){
    myEle = document.createElement(ele)
    if(txt) myEle.textContent=txt
    if(classes) myEle.classList = classes
    parent.appendChild(myEle)
    return myEle
}


function drawdata(users){
  users.forEach(u => {
    
    row = createMyOwnEle(tablecontent, "tr" , null , null)
    headers.forEach(h=>{
        if(h == "address") {
            td=createMyOwnEle(row,"td",u.address.street,null)   
           td=createMyOwnEle(row,"td",u.address.suite,null) 
            td=createMyOwnEle(row,"td",u.address.city,null) 
         }
        else{
        td=createMyOwnEle(row,"td",u[h],null)
        console.log(h)
        
        }
    })
    //console.log(u["address"].street)
    console.log(u)
    console.log(u["name"])
    console.log(u["website"])

    
  });
}


