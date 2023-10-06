import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Empleado from './components/Empleado';
import Form from './components/Form';
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';

export default function App() {

  const [empleados, setEmpleados] = useState([]);
  const [showform, saveShowForm] = useState(false);

  //Obtener datos del storage
  useEffect(() => {
    const obtenerempleadosStorage = async () => {
      try {
        const empsStorage = await AsyncStorage.getItem('empleados');
        if (empsStorage) {
          setEmpleados(JSON.parse(empsStorage))
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
      <View style={styles.gradientContainer}>
                <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                    <Defs>
                        <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <Stop offset="0" stopColor={FROM_COLOR} />
                            <Stop offset="1" stopColor={TO_COLOR} />
                        </LinearGradient>
                    </Defs>
                    <Rect width="100%" height="100%" fill="url(#grad)" />
                </Svg>
      </View>

      <View style={styles.contenedor} >
      <Text style={styles.titulo1}>Bienvenido a Servicios Contables</Text>

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
  titulo1: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:35
    },
  contenido: {
  flex: 1,
  marginHorizontal: '2.5%',
  },
  listado: {
  flex: 1,
  },
  
  gradientContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
},

  //Boton
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#2c278d',
    marginVertical: 10,
    alignItems: 'center',
    marginLeft:70,
    marginRight:70,
  },

  textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
    }
  });
