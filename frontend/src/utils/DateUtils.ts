export function formatDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0
    const day = date.getDate().toString().padStart(2, '0');

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