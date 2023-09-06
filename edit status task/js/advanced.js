const female = function (name,age){
    this.name=name;
    this.age=age;
    this.print = function(){
        console.log(`${this.name} - ${this.age}`)
    }
}

female.prototype.show = function(){
    console.log(`${this.name} - ${this.age}`)
}

newfemale = new female("mareez",23)

class f{
constructor(n , a){
    this.name=n;
    this.age=a
}
show(){
    console.log(`${this.name} - ${this.age}`)
}
}

newfemale2 = new f("mareez",23)
newfemale2.show()