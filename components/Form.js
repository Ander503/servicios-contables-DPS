import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert,ScrollView } from 'react-native';
import shortid from "react-id-generator";

const Form =({empleados, setEmpleados, saveShowForm, SaveEmployeStorage})=>{
    //variables para el formulario de empleado
    
    const [nombre, guardarNombre] = useState('');
    const [apellido, guardarApellido] = useState('');
    const [salario, guardarSalario] = useState(''); 


    const crearNuevoEmpleado=()=>{
        //Validacion
        if (nombre.trim()===''||
            apellido.trim()===''||
            salario.trim()==='') {

            //Falla la validacion
            mostrarAlerta();
            return;
        }
        //Creando nuevo objeto con los datos del formulario
        const emp = { nombre, apellido, salario};
        emp.id=shortid();

        //Agregando Variables al state (al arreglo)
        const empsNuevo = [...empleados, emp];
        setEmpleados(empsNuevo);

        // Pasar los nuevos datos del empleado a storage
        SaveEmployeStorage(JSON.stringify(empsNuevo));

        // Ocultar el formulario
         saveShowForm(false);
    }

    const mostrarAlerta = () => {
        Alert.alert(
                'Error', // Titulo
                'Todos los campos son obligatorios', // mensaje
            [{
                text: 'OK' // Arreglo de botones
            }]
        )
    }

    return(
        <>
        <ScrollView style={styles.formulario}>
            <View>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={texto => guardarNombre(texto)}
                />
            </View>

            <View>
                <Text style={styles.label}>Apellido:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={texto => guardarApellido(texto)}
                />
            </View>

            <View>
                <Text style={styles.label}>Salario Mensual:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={texto => guardarSalario(texto)}
                    keyboardType='numeric'
                />
            </View>
                                    

            <View>
            <TouchableHighlight onPress={() => crearNuevoEmpleado()} style={styles.btnSubmit}>
                <Text style={styles.textoSubmit}>Crear Nueva Cita</Text>
            </TouchableHighlight>
            </View>


        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#f31919',
        paddingHorizontal: 20,
        paddingVertical: 10,
       
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#FFEF36',
        marginVertical: 10
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
    })
export default Form;