export const  obtenerFechaActual= ()=> {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Agrega un 0 si es necesario
    const dia = String(fecha.getDate()).padStart(2, '0'); // Agrega un 0 si es necesario

    return `${anio}-${mes}-${dia}`;
}

console.log(obtenerFechaActual()); // Ejemplo de salida: 2025-01-29
