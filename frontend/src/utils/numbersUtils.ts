//para representar cantidades numericas faciles de leer asignandoles los puntos
export function formatNumberWithDots(value: number): string { 
    return value.toLocaleString('es-ES');
}