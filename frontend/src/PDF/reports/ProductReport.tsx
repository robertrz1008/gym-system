import {Document, Page, Text, View } from "@react-pdf/renderer"
import {styles} from "../style"
import { Product } from "../../interfaces/autInterface"

interface Props{
    product: Product[]
}

function ProductsPdf({product}: Props){

    return (
        <Document>
        <Page size="A4" style={styles.Page}>
          <View style={styles.headerBorder}>
              <Text style={styles.title}>Listado de Productos</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColDes}>
                <Text style={styles.headerCell}>Descripcion</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.headerCell}>Stock</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.headerCell}>Categoria</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.headerCell}>Precio</Text>
              </View>
            </View>
    
            {/* Filas de la tabla */}
              {
                  product.map(pro => (
                      <View style={styles.tableRow}>
                          <View style={styles.tableColDes}>
                              <Text style={styles.tableCell}>{pro.description}</Text>
                          </View>
                          <View style={styles.tableCol}>
                              <Text style={styles.numberCell}>{pro.stock}</Text>
                          </View>
                          <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>{pro.category_name}</Text>
                          </View>
                          <View style={styles.tableCol}>
                              <Text style={styles.numberCell}>{pro.price_venta}</Text>
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

export default ProductsPdf