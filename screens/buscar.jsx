import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import axios from 'axios';

const Buscar = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = () => {
    // Realizar la búsqueda aquí con la API
    axios.get(`http://localhost/quinto-andres/api.php?cedula=${searchText}`)
      .then((response) => {
        setSearchResult(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la cédula"
          maxLength={10}
          keyboardType="numeric"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
      {/* Mostrar resultados de la búsqueda */}
      <FlatList
        data={searchResult}
        keyExtractor={(item) => item.cedula.toString()} // Asegúrate de tener un campo único como 'id'
        renderItem={({ item }) => (
          <View style={styles.resultContainer}>
            <Text>Cedula: {item.cedula}</Text>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Apellido: {item.apellido}</Text>
            <Text>Direccion: {item.direccion}</Text>
            <Text>Telefono: {item.telefono}</Text>
            {/* Otros campos de la tabla */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 10,
    padding: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Buscar;
