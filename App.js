import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Empleado from './components/Empleado';
import Form from './components/Form';

export default function App() {

  const [empleados, setEmpleados] = useState([]);
  const [showform, saveShowForm] = useState(false);

  //Obtener datos del storage
  useEffect(() => {
    const obtenerempleadosStorage = async () => {
      try {
        const empsStorage = await AsyncStorage.getItem('empleados');
        if (empsStorage) {
          setCitas(JSON.parse(empsStorage))
        }
      } catch (error) {
        console.log(error);
      }
    }
    obtenerempleadosStorage();}, []);

    const delete_empleado   = id => {
    const empleados_Filtrados = empleados.filter(emplo => emplo.id !== id);
    setEmpleados(empleados_Filtrados);
    SaveEmployeStorage(JSON.stringify(empleados_Filtrados));
    }

      
  // Muestra u oculta el Formulario
    const mostrarFormulario = () => {
      saveShowForm(!showform);}
    
    const cerrarTeclado = () => {
      Keyboard.dismiss();
    }
  
  // Almacenar las citas en storage
    const SaveEmployeStorage = async (personJSON) => {
      try {
        await AsyncStorage.setItem('empleados', personJSON);
      } catch (error) {
      console.log(error);
    }
  }





  return (    
    <TouchableWithoutFeedback onPress={()=> cerrarTeclado()}>
      <View style={styles.contenedor} >

        <View>
          <TouchableHighlight onPress={()=>mostrarFormulario()} style={styles.btnMostrarForm}>            
          <Text style={styles.textoMostrarForm}> {showform ? 'Cancelar' : 'Añadir nuevo Empleado'} </Text>          
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          {showform ?(
            <>
              <Text style={styles.titulo}>Añadir Empleado</Text>
              <Form
                empleados={empleados}
                setEmpleados={setEmpleados}
                saveShowForm={saveShowForm}
                SaveEmployeStorage={SaveEmployeStorage}
              />
            </>
          ):(
            <>
            <Text style={styles.titulo}> {empleados.length > 0 ? 'Administra Empleados' : 'No hay Empledos'} </Text>
            <FlatList
              style={styles.listado}
              data={empleados}
              renderItem={({ item }) => <Empleado item={item}
              delete_empleado={delete_empleado} />}
              keyExtractor={emp => emp.id}
            />

            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
    
  );
};


const styles = StyleSheet.create({
  contenedor: {
  backgroundColor: '#1181BF',
  flex: 1,
  marginTop:40
  },
  titulo: {
  color: '#FFF',
  marginTop: Platform.OS === 'ios' ? 40 : 20,
  marginBottom: 20,
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center'
  },
  contenido: {
  flex: 1,
  marginHorizontal: '2.5%',
  },
  listado: {
  flex: 1,
  },
  btnMostrarForm: {
  padding: 10,
  backgroundColor: '#FFEF36',
  marginVertical: 10
  },
  textoMostrarForm: {
  color: '#FFF',
  fontWeight: 'bold',
  textAlign: 'center'
  }
  });
