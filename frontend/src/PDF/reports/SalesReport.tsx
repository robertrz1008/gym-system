import {Document, Page, Text, View } from "@react-pdf/renderer"
import {styles} from "../style"
import { SalesReport } from "../../interfaces/autInterface"
import { formartDateAndHour } from "../../utils/DateUtils"

interface Props{
    salesReport: SalesReport[]
}

function getDayHour(n: string){
    const a = formartDateAndHour(n)
    return a.fecha+" "+a.hora
}

function SalePDF({salesReport}: Props){

    return (
        <Document>
        <Page size="A4" style={styles.Page}>
          <View style={styles.headerBorder}>
              <Text style={styles.title}>Reporte de Ventas</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.tableColDes}>
                    <Text style={styles.headerCell}>PRODUCTO</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.headerCell}>FECHA </Text>
                </View>
                <View style={styles.tableCol15}>
                    <Text style={styles.headerCell}>PRECIO</Text>
                </View>
                <View style={styles.tableCol10}>
                    <Text style={styles.headerCell}>CANTIDAD </Text>
                </View>
                <View style={styles.tableCol15}>
                    <Text style={styles.headerCell}>SUBTOTAL</Text>
                </View>
            </View>
    
            {/* Filas de la tabla */}
              {
                  salesReport.map(item => (
                      <View style={styles.tableRow}>
                          <View style={styles.tableColDes}>
                              <Text style={styles.tableCell}>{item.product}</Text>
                          </View>
                          <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>{getDayHour(item.date)}</Text>
                          </View>
                          <View style={styles.tableCol15}>
                              <Text style={styles.tableCell}>{item.price_venta}</Text>
                          </View>
                          <View style={styles.tableCol10}>
                              <Text style={styles.tableCell}>{item.amount}</Text>
                          </View>
                          <View style={styles.tableCol15}>
                              <Text style={styles.numberCell}>{item.subtotal}</Text>
                          </View>
                    </View>
                  )) 
              }
    
            {/* Puedes añadir más filas de la misma manera */}
          </View>
        </Page>
      </Document>
    )
}

export default SalePDF