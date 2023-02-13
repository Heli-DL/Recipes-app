import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Image, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);
  const getRepositories = () => {
    console.log(keyword);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setRepositories(data.meals)
    })
    .catch(error => {
      Alert.alert('Error', error);
    });

  }

  return (
    <View style={styles.container}>
      <View style={styles.list}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>
          <View style={{borderBottomColor: 'lightgrey', borderBottomWidth: 1, width: windowWidth}}>
            <Text
              style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}
            </Text>
            <Image source={{ uri: `${item.strMealThumb}` }} style={{height: 50, width: 50}}/>
          </View>}
        data={repositories} />
      </View>
      <View style={styles.input}>
      <TextInput
        style={{fontSize: 18, width: 200, height: 40, borderBottomColor: 'grey', borderBottomWidth: 1, marginBottom: 5}}
        placeholder='keyword'
        value={keyword}
        onChangeText={text => setKeyword(text)}
      />
      <Button title="Find" onPress={getRepositories} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  list: {
    flex: 5,
    marginTop: 50,
    marginHorizontal: 10,
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
