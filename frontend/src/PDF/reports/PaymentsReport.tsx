import {Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer"
import {styles} from "../style"
import { PaymentsReport } from "../../interfaces/autInterface"
import { convertISOStringToDateString } from "../../utils/DateUtils"

interface Props{
    paymentsReport: PaymentsReport[]
}



function PaymentPDF({paymentsReport}: Props){

    return (
        <Document>
        <Page size="A4" style={styles.Page}>
          <View style={styles.headerBorder}>
              <Text style={styles.title}>Reporte de Pagos</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.tableColDes}>
                    <Text style={styles.headerCell}>CLIENTE</Text>
                </View>
                <View style={styles.tableCol15}>
                    <Text style={styles.headerCell}>DNI</Text>
                </View>
                <View style={styles.tableCol15}>
                    <Text style={styles.headerCell}>TIPO DE PAGO</Text>
                </View>
                <View style={styles.tableCol15}>
                    <Text style={styles.headerCell}>FECHA </Text>
                </View>
                <View style={styles.tableCol15}>
                    <Text style={styles.headerCell}>Total</Text>
                </View>
            </View>
    
            {/* Filas de la tabla */}
              {
                  paymentsReport.map(pro => (
                      <View style={styles.tableRow}>
                          <View style={styles.tableColDes}>
                              <Text style={styles.tableCell}>{pro.name}</Text>
                          </View>
                          <View style={styles.tableCol15}>
                              <Text style={styles.tableCell}>{pro.dni}</Text>
                          </View>
                          <View style={styles.tableCol15}>
                              <Text style={styles.tableCell}>{pro.type_payment}</Text>
                          </View>
                          <View style={styles.tableCol15}>
                              <Text style={styles.tableCell}>{convertISOStringToDateString(pro.pay_date)}</Text>
                          </View>
                          <View style={styles.tableCol15}>
                              <Text style={styles.numberCell}>{pro.total}</Text>
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

export default PaymentPDF