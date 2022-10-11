class Usuario {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.autos = [];
    this.mascotas = [];
  }

  getFullName() {
    return console.log(`Usuario: ${this.nombre} ${this.apellido}`);
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
  }

  countMascotas() {
    return console.log(`Tiene: ${this.mascotas.length} mascotas`);
  }

  addAuto(auto) {
    this.autos.push(auto);
  }

  getAutoNames() {
    const arrayAutos = this.autos.map((arrayNuevo) => arrayNuevo.name);
  }

  showAuto() {
    this.autos.forEach((unauto) => {
      console.log(`Tiene un auto: "${unauto.name}", del año: "${unauto.año}"`);
    });
  }
}

const user1 = new Usuario("Oscar", "Perez");

user1.addAuto({ name: "Nissan S15", año: "2000" });

user1.getFullName();
user1.addMascota("gatito");
user1.addMascota("perrito");
user1.countMascotas();
let arrayAutos = user1.getAutoNames();
user1.showAuto();
