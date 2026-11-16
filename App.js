import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// ---------- DATA ----------
// Each section = one Element. Extra section values (icon, colours) style the header + rows.
// card = card number from https://tcg.pokemon.com/en-us/galleries/151/
const datasource = [
  {
    title: 'Electric',
    icon: 'flash',
    color: '#F7C600',     // main colour (header)
    light: '#FFF8D6',     // soft colour (row background)
    data: [
      {key: 'Pikachu', card: 25},
      {key: 'Voltorb', card: 100},
    ],
  },
  {
    title: 'Water',
    icon: 'water',
    color: '#3B8EEA',
    light: '#E3F0FD',
    data: [
      {key: 'Squirtle', card: 7},
      {key: 'Psyduck', card: 54},
    ],
  },
  {
    title: 'Fire',
    icon: 'flame',
    color: '#F2683C',
    light: '#FDE9E1',
    data: [
      {key: 'Charmander', card: 4},
      {key: 'Growlithe', card: 58},
    ],
  },
  {
    title: 'Grass',
    icon: 'leaf',
    color: '#4CAF50',
    light: '#E5F5E6',
    data: [
      {key: 'Bulbasaur', card: 1},
      {key: 'Oddish', card: 43},
    ],
  },
];

// Builds the online card image URL from the card number
const getCardImage = (card) =>
  `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${card}-2x.png`;

// 25 -> "#025"
const formatNumber = (num) => '#' + String(num).padStart(3, '0');

// ---------- CARD PICTURE (shows a placeholder if the picture can't load) ----------
const CardImage = ({card}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <View style={[styles.cardImage, styles.placeholder]}>
        <Ionicons name="image-outline" size={36} color="#999" />
        <Text style={styles.placeholderText}>No image</Text>
      </View>
    );
  }

  return (
    <Image
      source={{uri: getCardImage(card)}}
      style={styles.cardImage}
      resizeMode="contain"
      onError={() => setFailed(true)}
    />
  );
};

// ---------- ONE ROW ----------
// renderItem also receives "section", so each row can use its element's colours
const renderItem = ({item, section}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.itemBox, {backgroundColor: section.light, borderLeftColor: section.color}]}
      onPress={() =>
        Alert.alert(item.key, `${section.title} type  •  Card ${formatNumber(item.card)}`)
      }
    >
      {/* Left: name and details */}
      <View style={styles.itemInfo}>
        <Text style={styles.itemNumber}>{formatNumber(item.card)}</Text>
        <Text style={styles.itemName}>{item.key}</Text>
        <View style={[styles.typeChip, {backgroundColor: section.color}]}>
          <Ionicons name={section.icon} size={12} color="#fff" />
          <Text style={styles.typeChipText}>{section.title}</Text>
        </View>
      </View>

      {/* Right: card picture */}
      <CardImage card={item.card} />
    </TouchableOpacity>
  );
};

// ---------- SECTION HEADER ----------
const renderSectionHeader = ({section: {title, icon, color, data}}) => {
  return (
    <View style={[styles.headerBox, {backgroundColor: color}]}>
      <View style={styles.headerIconCircle}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.headerText}>{title.toUpperCase()}</Text>
      <View style={styles.countBadge}>
        <Text style={[styles.countText, {color: color}]}>{data.length}</Text>
      </View>
    </View>
  );
};

// ---------- APP ----------
const App = () => {
  const total = datasource.reduce((sum, section) => sum + section.data.length, 0);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Title bar */}
      <View style={styles.titleBar}>
        <Ionicons name="albums" size={26} color="#fff" />
        <View style={{marginLeft: 10}}>
          <Text style={styles.titleText}>Pokémon Cards</Text>
          <Text style={styles.subtitleText}>Scarlet & Violet 151 • {total} cards</Text>
        </View>
      </View>

      {/* Add Pokemon button (above the list) */}
      <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={() => {}}>
        <Ionicons name="add-circle" size={22} color="#fff" />
        <Text style={styles.addButtonText}>ADD POKEMON</Text>
      </TouchableOpacity>

      <SectionList
        sections={datasource}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

// ---------- STYLES ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F9',
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3350D',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 18,
  },
  titleText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: '#FFD9D0',
    fontSize: 13,
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A75BB',
    marginHorizontal: 14,
    marginTop: 14,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 1,
  },
  list: {
    paddingHorizontal: 14,
    paddingBottom: 30,
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 18,
    marginBottom: 8,
  },
  headerIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    letterSpacing: 1,
  },
  countBadge: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  countText: {
    fontWeight: 'bold',
  },
  itemBox: {
    flexDirection: 'row',            // name on the left, picture on the right
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    borderLeftWidth: 6,
    padding: 12,
    marginVertical: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  itemInfo: {
    flex: 1,
    paddingRight: 10,
  },
  itemNumber: {
    color: '#888',
    fontSize: 13,
    fontWeight: '600',
  },
  itemName: {
    color: '#222',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  typeChipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  cardImage: {
    width: 130,
    height: 182,
    borderRadius: 8,
  },
  placeholder: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
});

export default App;
