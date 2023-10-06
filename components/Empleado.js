import React from "react";
import {Text, StyleSheet, View, TouchableHighlight} from 'react-native';


const Empleado = ({item, eliminarEmpleado}) =>{
    const dialogoEliminar = id =>{
        console.log('Eliminando....', id);
        eliminarPaciente(id);
    }

    return(        
        <View style={styles.cita}>
            <View>
                <Text style={styles.label}>Nombre: </Text>
            </View>

            <View>
                <Text style={styles.label}>Apellido: </Text>
            </View>

            <View>
                <Text style={styles.label}>Salario Mensual: </Text>
                
            </View>

            <View>
                <Text style={styles.label}>Descuento total: </Text>
                
            </View>
            <View>
                <Text style={styles.label}>Salario Neto: </Text>
                
            </View>

            <View>
                
            <TouchableHighlight onPress={() => dialogoEliminar(item.id)}
            style={styles.btnEliminar}>
                <Text style={styles.textoEliminar}> Eliminar &times; </Text>
            </TouchableHighlight>
            </View>
        </View>
    );
} 

const styles = StyleSheet.create({
    cita: {
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20   
    },
    texto: {
        fontSize: 18,
    },
    btnEliminar: {
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10
    },
    textoEliminar: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
export default Cita;
    