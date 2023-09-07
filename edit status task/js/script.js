// const addUser = document.getElementById("addUser")
const allUsers = []
const addUser = document.querySelector("#addUser")
const showAll = document.querySelector("#showAll")
const singleuser = document.querySelector("#singleuser")
const formHeaders = ["id", "userName", "age" , "active"]
const dataWrap = document.querySelector("#dataWrap")

const createUserObj = function(formData){
    console.log(formData)
    console.log("hellooooooooooo")
    const user = { }
    formHeaders.forEach( h => {
        
        if( h == "id" ) user[h]=Date.now()
        else if( h =="active") {
            console.log("anahnaaaaa")
           if(formData[h].checked){
            user[h] = true
           }
           else{
            user[h]=false
           }
        } 
        else user[h] = formData[h].value
    })
    return user
}

const storeToLocalStorage = function(key, data){
    //if there is an error set item with []
    let myData
    try{
        myData =  JSON.stringify(data)
    }
    catch(e){
        myData = '[]'
    }
    localStorage.setItem(key, myData)
}
if(addUser){
    addUser.addEventListener("submit", function(e){
        e.preventDefault()
        const allUsers = JSON.parse(localStorage.getItem('myUsers')) || []
        let user = createUserObj( addUser.elements )
        console.log(addUser.elements )
        allUsers.push(user)
        // localStorage.setItem("allUsers", JSON.stringify(allUsers))
        storeToLocalStorage("myUsers", allUsers)
        addUser.reset()
        window.location="index.html"
    })
}



const addtd= function(innertext , ele){
    let td = document.createElement("td")
    td.textContent=innertext
    ele.appendChild(td)
    return td
}
const addbtn = function(text , ele){
        let td = document.createElement("td")
        el = document.createElement("button")
        el.textContent=text
        switch (text) {
            case "delete":
                el.classList = "btn btn-danger mx-2"
                break;
            
            case "edit":
                el.classList = "btn btn-success mx-2"
                break;

            case "show":
                el.classList = "btn btn-primary mx-2"
                break;

            default:
                break;
        }
        
        td.appendChild(el)
        ele.appendChild(td)
        return el
}

function drawall(usersData){
if(dataWrap)
{
    console.log("d5lt")
    document.write("llllllllllll")
    
   // const usersData = JSON.parse(localStorage.getItem('myUsers')) || []
   // console.log(usersData)
    if( !usersData.length ){
        const tr = document.createElement("tr")
        dataWrap.appendChild(tr)
        tr.textContent="no users yet"
    }
    usersData.forEach((user, index)=>{
        const tr = document.createElement("tr")
        dataWrap.appendChild(tr)
        formHeaders.forEach(h=>{
            if(h == "active"){
                console.log("d5lt active")
                let td = document.createElement("td")
                check = document.createElement("INPUT");
                check.setAttribute("type", "checkbox");
                var label = document.createElement("LABEL");
                var text = document.createTextNode("active");
                label.setAttribute("for", "active");
                label.appendChild(text); 
                if(user[h]== true) check.checked=true
                else check.checked=false

                
                td.appendChild(check)
                td.appendChild(label)
                tr.appendChild(td)
            }else{
             console.log("bra el active")   
             td = addtd(user[h],tr)
            }
        })
        
        del = addbtn("delete",tr)
        
       // show= addbtn("show",tr)

        del.addEventListener("click", function(e){
            console.log(index)
            usersData.splice(index, 1)
            tr.remove()
            storeToLocalStorage("myUsers", usersData)
            drawall(usersData) 
           
            
        })

        

        check.addEventListener('change', (event) => {
            user["active"]= !user["active"]
            console.log(usersData)
            storeToLocalStorage("myUsers", usersData)
          })
    })
}
}

   















if(dataWrap){
    const usersData = JSON.parse(localStorage.getItem('myUsers')) || []
    drawall(usersData)
}

/*

data = [
    {
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "https://via.placeholder.com/600/92c952",
      "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    },
    {
      "albumId": 1,
      "id": 2,
      "title": "reprehenderit est deserunt velit ipsam",
      "url": "https://via.placeholder.com/600/771796",
      "thumbnailUrl": "https://via.placeholder.com/150/771796"
    },
    {
      "albumId": 1,
      "id": 3,
      "title": "officia porro iure quia iusto qui ipsa ut modi",
      "url": "https://via.placeholder.com/600/24f355",
      "thumbnailUrl": "https://via.placeholder.com/150/24f355"
    },
    {
      "albumId": 1,
      "id": 4,
      "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      "url": "https://via.placeholder.com/600/d32776",
      "thumbnailUrl": "https://via.placeholder.com/150/d32776"
    },
    {
      "albumId": 1,
      "id": 5,
      "title": "natus nisi omnis corporis facere molestiae rerum in",
      "url": "https://via.placeholder.com/600/f66b97",
      "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
    },
    {
      "albumId": 1,
      "id": 6,
      "title": "accusamus ea aliquid et amet sequi nemo",
      "url": "https://via.placeholder.com/600/56a8c2",
      "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
    },
    {
      "albumId": 1,
      "id": 7,
      "title": "officia delectus consequatur vero aut veniam explicabo molestias",
      "url": "https://via.placeholder.com/600/b0f7cc",
      "thumbnailUrl": "https://via.placeholder.com/150/b0f7cc"
    },
    {
      "albumId": 1,
      "id": 8,
      "title": "aut porro officiis laborum odit ea laudantium corporis",
      "url": "https://via.placeholder.com/600/54176f",
      "thumbnailUrl": "https://via.placeholder.com/150/54176f"
    },
    {
      "albumId": 1,
      "id": 9,
      "title": "qui eius qui autem sed",
      "url": "https://via.placeholder.com/600/51aa97",
      "thumbnailUrl": "https://via.placeholder.com/150/51aa97"
    },
    {
      "albumId": 1,
      "id": 10,
      "title": "beatae et provident et ut vel",
      "url": "https://via.placeholder.com/600/810b14",
      "thumbnailUrl": "https://via.placeholder.com/150/810b14"
    }
  ]



newdata = data.filter(img=>{
    return img.id>5
})

console.log(newdata)





userarr=[

]

function adddata(id,username,age){
    obj = {
        id:id,
        Uname:username,
        Uage:age,
        
    }
    userarr.push(obj)
}

function print(){
    userarr.forEach(u=>{
        console.log(u);
    });
}

adddata(1,"mareez",23)
adddata(2,"vera",20)

function del (id){
   
   index = userarr.findIndex(u=>u.id==id)
   userarr.splice(index,0)
}

*/