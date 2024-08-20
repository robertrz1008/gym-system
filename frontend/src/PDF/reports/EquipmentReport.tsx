import {Document, Page, Text, View } from "@react-pdf/renderer"
import {styles} from "../style"
import { Equipment } from "../../interfaces/autInterface"

interface Props{
    equipments: Equipment[]
}

function EquipmentReport({equipments}: Props) {
  return (
    <Document>
        <Page size="A4" style={styles.Page}>
            <View style={styles.headerBorder}>
                <Text style={styles.title}>Listado de Equipos</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                <View style={styles.tableColDes}>
                    <Text style={styles.headerCell}>DESCRIPCION</Text>
                </View>
                <View style={styles.tableColDes}>
                    <Text style={styles.headerCell}>OBSERVACION</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.headerCell}>CANTIDAD</Text>
                </View>
                </View>

                {/* Filas de la tabla */}
                {
                    equipments.map(pro => (
                        <View style={styles.tableRow}>
                            <View style={styles.tableColDes}>
                                <Text style={styles.tableCell}>{pro.description}</Text>
                            </View>
                            <View style={styles.tableColDes}>
                                <Text style={styles.tableCell}>{pro.observation}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.numberCell}>{pro.amount}</Text>
                            </View>
                        </View>
                    )) 
                }
            </View>
        </Page>
  </Document>
  )
}

export default EquipmentReport