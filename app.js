"use strict";

/* ===== CLASES ===== */

// Se asume que cada tarea tiene un id numérico único.
class Tarea {
  constructor(id, titulo, completada) {
    this.id = id;
    this.titulo = titulo;
    this.completada = completada;
  }

  toggleEstado() {
    this.completada = !this.completada;
  }
}

// Se asume que, si se proporciona un array este contiene tareas,
// todos sus elementos son instancias válidas de Tarea.
// Agrego una logica de gestion de ids.

class GestorTareas {
  constructor(tareas = []) {
    this.tareas = tareas;
    if (this.tareas.length === 0) {
      this.nextId = 1;
    } else {
      this.nextId =
        this.tareas.reduce(
          (acc, tarea) => (acc < tarea.id ? tarea.id : acc),
          1,
        ) + 1;
    }
  }

  // agrego metodo para encapsular y cumplir el opcional 1 sin acceder directamente a la propiedad
  obtenerTareas() {
    return [...this.tareas];
  }

  obtenerTitulos() {
    return this.tareas.map((tarea) => tarea.titulo);
  }

  agregarTarea(titulo) {
    this.tareas.push(new Tarea(this.nextId, titulo, false));
    this.nextId++;
  }

  // Método listarTareas() → usa forEach para mostrar todas las tareas en consola.
  listarTareas() {
    console.log("Listado de tareas:");
    this.tareas.forEach((tarea) => {
      console.log(
        `#${tarea.id} - ${tarea.titulo} ${tarea.completada ? "✔" : "✘"}`,
      );
    });
  }

  buscarPorTitulo(titulo) {
    return this.tareas.find(
      (tarea) => tarea.titulo.toUpperCase() === titulo.toUpperCase(),
    );
  }

  listarCompletadas() {
    return this.tareas.filter((tarea) => tarea.completada);
  }
}

/* ===== SIMULACIÓN DE DATOS ===== */

const cargarTareas = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tareas = [
        new Tarea(1, "Estudiar JS", true),
        new Tarea(6, "Hacer TP", false),
        new Tarea(23, "Repasar arrays", true),
      ];
      resolve(tareas);
    }, 2000);
  });
};

const cargarUsuarios = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["usuario1", "usuario2"]);
    }, 2000);
  });
};

/* ===== EJECUCIÓN ===== */

async function iniciar() {
  const [tareas, usuarios] = await Promise.all([
    cargarTareas(),
    cargarUsuarios(),
  ]);

  const gestor = new GestorTareas(tareas);
  console.log("Tareas cargadas correctamente\n");

  gestor.listarTareas();
  console.log("");

  gestor.agregarTarea("Crear repo");

  console.log("Tareas completadas:");
  gestor.listarCompletadas().forEach((t) => {
    console.log(`- ${t.titulo}`);
  });
  console.log("");

  console.log("Títulos de tareas:");
  console.log(gestor.obtenerTitulos().join(", "));
  console.log("");
}

iniciar();
