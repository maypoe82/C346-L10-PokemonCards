import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Each section = one element. icon / bgcolor / textcolor are extra section values.
// card = the card number from https://tcg.pokemon.com/en-us/galleries/151/
const datasource = [
  {
    title: 'ELECTRIC',
    icon: 'flash',
    bgcolor: '#FFF34D',
    textcolor: '#B8860B',
    data: [
      {key: 'Pikachu', card: 25},
      {key: 'Voltorb', card: 100},
    ],
  },
  {
    title: 'WATER',
    icon: 'water',
    bgcolor: '#87CEEB',
    textcolor: '#1E5AA8',
    data: [
      {key: 'Squirtle', card: 7},
      {key: 'Psyduck', card: 54},
    ],
  },
  {
    title: 'FIRE',
    icon: 'flame',
    bgcolor: '#FFA07A',
    textcolor: '#C0392B',
    data: [
      {key: 'Charmander', card: 4},
      {key: 'Growlithe', card: 58},
    ],
  },
  {
    title: 'GRASS',
    icon: 'leaf',
    bgcolor: '#9BE39B',
    textcolor: '#1E7B34',
    data: [
      {key: 'Bulbasaur', card: 1},
      {key: 'Oddish', card: 43},
    ],
  },
];

// Builds the online card image URL from the card number
const getCardImage = (card) =>
  `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${card}-2x.png`;

const renderItem = ({item}) => {
  return (
    <TouchableOpacity
      style={styles.itemBox}
      onPress={() => Alert.alert('You picked', item.key)}
    >
      <Text style={styles.itemName}>{item.key}</Text>
      <Image
        source={{uri: getCardImage(item.card)}}
        style={styles.cardImage}
        resizeMode="contain"
        onError={(e) => console.log('Image failed:', item.key, e.nativeEvent.error)}
      />
    </TouchableOpacity>
  );
};

const renderSectionHeader = ({section: {title, icon, bgcolor, textcolor}}) => {
  return (
    <View style={[styles.headerBox, {backgroundColor: bgcolor}]}>
      <Ionicons name={icon} size={22} color={textcolor} />
      <Text style={[styles.headerText, {color: textcolor}]}>{title}</Text>
    </View>
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
        <Button title="Add Pokemon" onPress={() => {}} />
      </View>

      <SectionList
        sections={datasource}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#fff',
  },
  buttonBox: {
    padding: 10,
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderWidth: 1,
    marginTop: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  itemBox: {
    flexDirection: 'row',           // name and picture side by side
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E6E6FA',
    borderWidth: 1,
    padding: 10,
  },
  itemName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardImage: {
    width: 150,
    height: 210,
  },
});

export default App;
