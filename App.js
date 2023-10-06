import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform, Button, SafeAreaView,ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Empleado from './components/Empleado';
import Form from './components/Form';


export default function App() {

  const [empleados, setEmpleados] = useState([]);
  const [showform, saveShowForm] = useState(false);

  //Para calcular Salario
  const calcularSalario = (salario) => {
    let porcentaje = 0;

    //para seguro    
    let isss=0.03;
    //para afp
    let afp=0.0725;

  
    if (salario <= 325) {
      porcentaje = 0;
    } else if (salario <= 700) {
      porcentaje = 0.15;
    } else if (salario <= 1200) {
      porcentaje = 0.17;
    } else if (salario <= 2200) {
      porcentaje = 0.21;
    } else if (salario <= 3700) {
      porcentaje = 0.25;
    } else {
      porcentaje = 0.29;
    }
  
    let renta=salario*porcentaje;
    let descuentos=(renta) + (isss*salario)+(afp*salario)
    return salario - descuentos ;
  };
  



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

    <ImageBackground
    source={require('./src/img/fondo2.jpg')} // Ruta de la imagen de fondo
    style={styles.backgroundImage}
  >
    <TouchableWithoutFeedback onPress={()=> cerrarTeclado()}>
      

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
              renderItem={({ item }) => <Empleado
              item={item}
              delete_empleado={delete_empleado}
              resultado={calcularSalario(item.salario)}
            />}
              keyExtractor={emp => emp.id}
            />

            </>
          )}
        </View>
    </View>
      
    </TouchableWithoutFeedback>
  </ImageBackground>
  );
};


const styles = StyleSheet.create({
  contenedor: {
    
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
    marginTop:-2
    },

  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
    
  },

  listado: {
    flex: 1,
  },


  //Boton
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#2c278d',
    marginVertical: 10,
    alignItems: 'center',
    marginLeft:70,
    marginRight:70,
    borderRadius:10
  },

  textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
    },

    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', 
      justifyContent: 'center',
      marginTop:45
    },
  });
