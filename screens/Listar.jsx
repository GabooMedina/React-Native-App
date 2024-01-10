import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View,Modal } from "react-native";
import { TouchableOpacity } from "react-native-web";
import { useIsFocused } from '@react-navigation/native';



const StudentList = () => {
  const navigation = useNavigation();
  const [students, setStudents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();

  const goToBuscar = () => {
    navigation.navigate("buscar");
  };

  useEffect(() => {
    if (isFocused) {
      // Fetch updated data here
      cargarEstudiantes();
    }
  }, [isFocused]);

  const cargarEstudiantes = () => {
    axios
      .get("http://localhost/quinto-andres/api.php")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const [expandedItem, setExpandedItem] = useState(null);

  const handlePress = (item) => {
    if (expandedItem === item) {
      setExpandedItem(null);
    } else {
      setExpandedItem(item);
    }
  };

  const eliminarEstudiante = (cedula) => {
    axios.delete(`http://localhost/quinto-andres/api.php?var=${cedula}`)
      .then(response => {
        cargarEstudiantes();
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const renderItem = ({ item }) => {
    const isExpanded = expandedItem === item;

    return (
      
      <Pressable onPress={() => handlePress(item)}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>
            {item.nombre} {item.apellido}
          </Text>
          {isExpanded && (
            <>
              <Text style={styles.itemDetails}>Cédula: {item.cedula}</Text>
              <Text style={styles.itemDetails}>
                Dirección: {item.direccion}
              </Text>
              <Text style={styles.itemDetails}>Teléfono: {item.telefono}</Text>
              <View style={styles.buttonSeparator}>
                <TouchableOpacity
                  style={[styles.deleteButton, { backgroundColor: 'red' }]}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={{ color: 'white' }}>Eliminar</Text>
                </TouchableOpacity>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(false);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text>¿Estás seguro que deseas eliminar?</Text>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                          eliminarEstudiante(item.cedula);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={{ color: 'white' }}>Sí, eliminar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                          setModalVisible(false);
                        }}
                      >
                        <Text style={{ color: 'white' }}>Cancelar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                <TouchableOpacity
                  style={[styles.deleteButton, { backgroundColor: '#0dc1f2' }]}
                  title="Actualizar"
                  onPress={() =>
                    navigation.navigate("Editar", {
                      estudiante: { cedula: item.cedula, nombre: item.nombre, apellido: item.apellido, direccion: item.direccion, telefono: item.telefono }
                    })
                  }
                >
                  <Text style={{ color: 'white' }}>Actualizar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Pressable>
    );
  };

  const kaboom = () => {
    alert("Kboom?");
  }
  return (
    
    <View style={styles.container}>
       <TouchableOpacity style={styles.button} onPress={goToBuscar}>
        <Text style={{ color: "#f0f0f0" }}>Buscar </Text>
      </TouchableOpacity>
      <Text style={styles.title}>Listado de Estudiantes</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.cedula}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <Pressable style={styles.button} onPress={() => navigation.navigate("Guardar")}>
        <Text style={{ color: "#f0f0f0" }}>Agregar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    color: "red",
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "column",
    padding: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDetails: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  }, buttonSeparator: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  deleteButton: {
    color: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    width: 90, // Establece un ancho mínimo inicial
    borderRadius: 15,
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 5,
  }, button: {
    alignSelf: 'center',
    alignItems: 'center',
    width: 90, // Establece un ancho mínimo inicial
    borderRadius: 15,
    backgroundColor: '#164220',
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 5,
  }, centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
});

export default StudentList;
