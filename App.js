import React from 'react';
import { View, Text, Image, SectionList, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Each section is one Element.
// Besides title and data, each section also has its own icon and colours.
const datasource = [
  {
    data: [
      {key: 'Pikachu', card: '25'},
      {key: 'Voltorb', card: '100'},
    ],
    title: 'ELECTRIC',
    icon: 'lightning-bolt',
    bgColor: '#F7D02C',
    rowColor: '#FFF8D6',
  },
  {
    data: [
      {key: 'Squirtle', card: '7'},
      {key: 'Psyduck', card: '54'},
    ],
    title: 'WATER',
    icon: 'water',
    bgColor: '#6390F0',
    rowColor: '#E3ECFD',
  },
  {
    data: [
      {key: 'Charmander', card: '4'},
      {key: 'Growlithe', card: '58'},
    ],
    title: 'FIRE',
    icon: 'fire',
    bgColor: '#EE8130',
    rowColor: '#FDEBDD',
  },
  {
    data: [
      {key: 'Bulbasaur', card: '1'},
      {key: 'Oddish', card: '43'},
    ],
    title: 'GRASS',
    icon: 'leaf',
    bgColor: '#7AC74C',
    rowColor: '#E9F6E0',
  },
];

// One row: Pokemon name on the left, card picture on the right
const renderItem = ({item, section}) => {
  return (
    <TouchableOpacity
      style={[styles.itemBox, {backgroundColor: section.rowColor}]}
      onPress={() => {
        Alert.alert(item.key, 'Element: ' + section.title + '\nCard number: ' + item.card);
      }}
    >
      <View style={styles.nameBox}>
        <Text style={styles.cardNumber}>No. {item.card}</Text>
        <Text style={styles.itemName}>{item.key}</Text>
      </View>

      <Image
        source={{uri: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_' + item.card + '-2x.png'}}
        style={styles.cardImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar />

      {/* Title */}
      <View style={styles.titleBox}>
        <MaterialCommunityIcons name="cards" size={28} color="white" />
        <Text style={styles.titleText}>POKEMON CARDS</Text>
      </View>

      {/* Add Pokemon button (above the list view) */}
      <TouchableOpacity style={styles.addButton}>
        <MaterialCommunityIcons name="plus-circle" size={22} color="white" />
        <Text style={styles.addButtonText}>ADD POKEMON</Text>
      </TouchableOpacity>

      <SectionList
        sections={datasource}
        renderItem={renderItem}
        contentContainerStyle={styles.listStyle}
        renderSectionHeader={({section: {title, icon, bgColor}}) => (
          <View style={[styles.headerBox, {backgroundColor: bgColor}]}>
            <MaterialCommunityIcons name={icon} size={24} color="white" />
            <Text style={styles.headerText}>{title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  titleBox: {
    flexDirection: 'row',          // icon and title side by side
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3350D',    // Pokemon red
    paddingTop: 40,
    paddingBottom: 15,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A75BB',    // Pokemon blue
    margin: 10,
    padding: 12,
    borderRadius: 10,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 6,
  },
  listStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginTop: 15,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 6,
  },
  itemBox: {
    flexDirection: 'row',          // name on the left, picture on the right
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },
  nameBox: {
    flex: 1,
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 13,
    color: 'grey',
  },
  itemName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  cardImage: {
    width: 140,
    height: 195,
  },
});

export default App;
