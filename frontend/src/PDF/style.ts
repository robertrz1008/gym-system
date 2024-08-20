import {StyleSheet} from "@react-pdf/renderer"

export const styles = StyleSheet.create({

    Page:{
        display:"flex",
        flexDirection: "column",
        alignItems: "center"
    },
   
    table: {
      display: 'flex',
      marginTop: "30px",
      width: '500px',
      borderStyle: 'solid',
      borderWidth: 0.3,
      borderColor: '#bfbfbf',
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tableColDes: {
        width: '40%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderBottom: "none"
    },
    tableCol: {
      width: '20%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
      borderBottom: "none"
    },
    headerCell: {
        margin: 5,
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: "center"
      },
    numberCell: {
        margin: 5,
        fontSize: 10,
        textAlign:"right"   
    },
    tableCell: {
      margin: 5,
      fontSize: 10,
    },
    headerBorder:{
        width: "86%",
        height: "50px",
        marginTop: "20px",
        borderRadius: "5px",
        border: "1px solid black",   
        display: "flex",
        justifyContent: "center",
        padding: "10px"
    },
    title: {
        textAlign: "center"
    }
  });

  export const ClientPDFStyles = StyleSheet.create({

    Page:{
        display:"flex",
        flexDirection: "column",
        alignItems: "center"
    },
   
    table: {
      display: 'flex',
      marginTop: "30px",
      width: '500px',
      borderStyle: 'solid',
      borderWidth: 0.3,
      borderColor: '#bfbfbf',
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tableColDes: {
        width: '40%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderBottom: "none"
    },
    tableCol: {
      width: '30%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
      borderBottom: "none"
    },
    headerCell: {
        margin: 5,
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: "center"
      },
    numberCell: {
        margin: 5,
        fontSize: 10,
        textAlign:"right"   
    },
    tableCell: {
      margin: 5,
      fontSize: 10,
    },
    headerBorder:{
        width: "86%",
        height: "50px",
        marginTop: "20px",
        borderRadius: "5px",
        border: "1px solid black",   
        display: "flex",
        justifyContent: "center",
        padding: "10px"
    },
    title: {
        textAlign: "center"
    }
  });