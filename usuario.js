class Usuario {
    constructor (nombre, apellido,){
        this.nombre= nombre;
        this.lastName = apellido;
        this.auto = [];
    }
  
  getNombreApellido(){
    return`${this.nombre} ${this.apellido}`;  
  }
  
  getAuto(auto){
    this.auto.push(auto);
  }
}

const user1 = new Usuario("Ricardo", "Arjona");
console.log(user1.getNombreApellido());
user1.addAuto("Ferrari");
