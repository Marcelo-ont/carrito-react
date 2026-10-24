const formateador = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0
})

export const formatearPrecio = (valor) => formateador.format(valor)
