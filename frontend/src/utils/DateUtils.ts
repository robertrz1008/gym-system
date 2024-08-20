export function formatDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}
//combertir fecha en formato string a aobjeto Date
export function formatStringToDate(fechaStr: string): Date {
    // Divide la cadena de fecha en partes: año, mes y día
    const [year, month, day] = fechaStr.split('-').map(Number);

    // Los meses en JavaScript son 0-indexed, por lo que restamos 1 al mes
    const fecha = new Date(year, month - 1, day);

    // Verifica si la fecha es válida
    if (isNaN(fecha.getTime())) {
        throw new Error("Fecha inválida proporcionada.");
    }

    return fecha;
}
export function convertISOStringToDateString(isoString: string): string {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function addOneMont(fecha: string): string {
    // Crear una nueva fecha basada en la fecha dada
    let nuevaFecha; 

    //si no se ingresa una fecha definida
    if(!fecha){
        nuevaFecha = new Date()
    }else{
        nuevaFecha =  new Date(fecha);
    }

    // Incrementar el mes
    nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);
    return formatDateToString(nuevaFecha);
}