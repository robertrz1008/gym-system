import { Client } from '../../interfaces/autInterface'
import {Document, Page, Text, View,  } from "@react-pdf/renderer"
import {ClientPDFStyles as styles} from "../style"

interface Props{
    clients: Client[]
}

function ClientReport({clients}: Props) {
    return (
        <Document>
        <Page size="A4" style={styles.Page}>
          <View style={styles.headerBorder}>
              <Text style={styles.title}>Listado de Clientes</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColDes}>
                <Text style={styles.headerCell}>NOMBRE Y APELLIDO</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.headerCell}>TELEFONO</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.headerCell}>DNI</Text>
              </View>
            </View>
    
            {/* Filas de la tabla */}
              {
                  clients.map(pro => (
                      <View style={styles.tableRow}>
                          <View style={styles.tableColDes}>
                              <Text style={styles.tableCell}>{pro.name}</Text>
                          </View>
                          <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>{pro.telephone}</Text>
                          </View>
                          <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>{pro.dni}</Text>
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

export default ClientReport