import React from "react";
import {Text, StyleSheet, View, TouchableHighlight} from 'react-native';


const Empleado = ({item, delete_empleado, resultado}) =>{
    const dialogoEliminar = id =>{
        console.log('Eliminando....', id);
        delete_empleado(id);
    }

    return(        
    <View style={styles.contenedor}>
        <View style={styles.employe}>
            <View>
                <Text style={styles.label}>Nombre: </Text>
                <Text style={styles.texto}>{item.nombre}</Text>
            </View>

            <View>
                <Text style={styles.label}>Apellido: </Text>
                <Text style={styles.texto}>{item.apellido}</Text>
            </View>

            <View>
                <Text style={styles.label}>Salario Mensual: </Text>
                <Text style={styles.texto}>{item.salario}</Text>
            </View>

            <View>
                <Text style={styles.label}>Descuento total: </Text>
                <Text style={styles.texto}> {item.salario - resultado}</Text>
            </View>
            <View>
                <Text style={styles.label}>Salario Neto: </Text>             
                <Text style={styles.texto}> {resultado} </Text>
            
            </View>
        </View>
    </View>
    );
} 

const styles = StyleSheet.create({
    contenedor:{
        marginLeft:20,
        marginRight:20,        
    }, 
    employe: {
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius:10,
        marginTop:20        
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 15   
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
export default Empleado;
    
/*Para eliminar
<TouchableHighlight onPress={() => dialogoEliminar(item.id)}
            style={styles.btnEliminar}>
                <Text style={styles.textoEliminar}> Eliminar &times; </Text>
            </TouchableHighlight>*/