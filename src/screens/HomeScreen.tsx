import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import MasonryList from 'reanimated-masonry-list';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomBackdrop from '../components/CustomBackdrop';
import FilterView from '../components/FilterView';
import {TabsStackScreenProps} from '../navigators/TabsNavigator';

import {
  newCollection,
  MESONARY_LIST_DATA,
  MasonryListItem,
  ShoesList,
  AccessoriesList,
  MuchMoreList,
  watchList,
} from '../data/Collections';

const HomeScreen = ({navigation}: TabsStackScreenProps<'Home'>) => {
  const {colors} = useTheme();
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const [searchTxt, setSearchTxt] = useState<string>('');
  const [addFav, setAddFav] = useState<{[key: string]: boolean}>({});
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [filteredData, setFilteredData] = useState<MasonryListItem[]>([]);

  const addFavPressed = (itemId: string) => {
    setAddFav(prevFavorites => ({
      ...prevFavorites,
      [itemId]: !prevFavorites[itemId],
    }));
  };

  const categories = [
    'Clothing',
    'Shoes',
    'Accessories',
    'Watches',
    'many more',
  ];

  const openFilterModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    let data: MasonryListItem[] = [];
    const selectedCategory = categories[categoryIndex];

    switch (selectedCategory) {
      case 'Shoes':
        data = ShoesList;
        break;
      case 'Accessories':
        data = AccessoriesList;
        break;
      case 'Watches':
        data = watchList;
        break;
      case 'many more':
        data = MuchMoreList;
        break;
      default:
        data = MESONARY_LIST_DATA;
    }


    const filtered = data.filter(item =>
      item.title.toLowerCase().includes(searchTxt.toLowerCase()),
    );


    setFilteredData(filtered);
  }, [categoryIndex, searchTxt]);

  const handleAddCart = () => {
    console.log('Added');
  };

  return (
    <ScrollView>
      <SafeAreaView style={{paddingVertical: 24, gap: 20}}>
        {/* Header section */}
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <Image
            source={require('../assets/Profile.jpg')}
            style={{width: 52, aspectRatio: 1, borderRadius: 52}}
            resizeMode="cover"
          />
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '800',
                marginBottom: 6,
                color: colors.text,
              }}>
              Hii, Utkarsh 👋
            </Text>
            <Text style={{color: colors.text, opacity: 0.75}}>
              Discover Fashion that suits your style
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
            }}>
            <View
              style={{
                borderWidth: 2,
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 40,
                borderColor: colors.border,
              }}>
              <Icons name="favorite" size={24} color="red" />
            </View>
            <Text style={{color: colors.text, fontWeight: '600'}}>LIKED</Text>
          </TouchableOpacity>
        </View>

        {/* Search and Filter */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 24,
            gap: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              height: 52,
              borderRadius: 52,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              paddingHorizontal: 24,
              flexDirection: 'row',
              gap: 12,
            }}>
            <Icons
              name="search"
              size={24}
              color={colors.text}
              style={{opacity: 0.5}}
            />
            <TextInput
              placeholder="Search"
              value={searchTxt}
              onChangeText={setSearchTxt}
              style={{flex: 1, fontSize: 16, color: colors.text}}
            />
          </View>
          <TouchableOpacity
            onPress={openFilterModal}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
              backgroundColor: colors.primary,
            }}>
            <Icons name="tune" size={24} color={colors.background} />
          </TouchableOpacity>
        </View>

        {/* Grid collection View */}
        <View style={{paddingHorizontal: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}>
            <Text style={{fontSize: 20, fontWeight: '700'}}>
              New Collection
            </Text>
            <TouchableOpacity>
              <Text>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={{gap: 12}}>
            <FlatList
              data={newCollection}
              renderItem={({item}) => (
                <Card
                  item={item}
                  onPress={selectedItem =>
                    navigation.navigate('Details', {item: selectedItem})
                  }
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>

        {/* Category section */}

        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 12, gap: 16}}
          renderItem={({item, index}) => {
            const isSelected = categoryIndex === index;
            return (
              <TouchableOpacity
                onPress={() => {
                  setCategoryIndex(index);
                }}
                style={{
                  backgroundColor: isSelected ? colors.primary : colors.card,
                  paddingHorizontal: 24,
                  paddingVertical: 16,
                  borderRadius: 100,
                }}>
                <Text
                  style={{
                    color: isSelected ? colors.background : colors.text,
                    opacity: isSelected ? 1 : 0.5,
                    fontSize: 16,
                    fontWeight: '700',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        <MasonryList
          data={filteredData}
          keyExtractor={(item, i) => i.toString()}
          numColumns={2}
          contentContainerStyle={{paddingHorizontal: 12}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, i}: {item: MasonryListItem; i: number}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', {item})}
              style={{padding: 6}}>
              <View
                style={{
                  aspectRatio: i === 0 ? 1 : 2 / 3,
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: 'grey',
                  borderRadius: 25,
                }}>
                <Image
                  source={{
                    uri: item.imageUrl,
                  }}
                  resizeMode="cover"
                  style={StyleSheet.absoluteFill}
                />
                <View style={{...StyleSheet.absoluteFillObject, padding: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        fontWeight: '700',
                        color: colors.text,
                      }}>
                      {item.title}
                    </Text>
                    <TouchableOpacity
                      onPress={() => addFavPressed(item.id)} // Pass the item ID here
                      style={{
                        backgroundColor: colors.background,
                        borderRadius: 100,
                        height: 32,
                        aspectRatio: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icons
                        name={addFav[item.id] ? 'favorite' : 'favorite-border'}
                        size={20}
                        color={
                          addFav[item.id] ? colors.notification : colors.text
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Add your desired view at the end of the item */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 50,
                    overflow: 'hidden',
                    margin: 10,
                    backgroundColor: 'rgba(0,0,0,0.35)',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#fff',
                      }}
                      numberOfLines={1}>
                      ₹{item.price}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderRadius: 50,
                      margin: 2,
                      backgroundColor: '#fff',
                    }}
                    activeOpacity={0.8}
                    onPress={handleAddCart}>
                    <Icons name="add-shopping-cart" size={15} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          onEndReachedThreshold={0.1}
        />
      </SafeAreaView>

      <BottomSheetModal
        index={0}
        ref={bottomSheetModalRef}
        snapPoints={['80%']}
        backdropComponent={props => <CustomBackdrop {...props} />}>
        <FilterView />
      </BottomSheetModal>
    </ScrollView>
  );
};

export default HomeScreen;

const Card = ({
  item,
  onPress,
}: {
  item: MasonryListItem;
  onPress: (item: MasonryListItem) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={{
        flex: 1,
        overflow: 'hidden',
        borderRadius: 24,
        margin: 5,
        width: 150,
        height: 250,
      }}>
      <Image
        source={{uri: item.imageUrl}}
        resizeMode="cover"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
      <View
        style={{
          alignItems: 'center',
          borderRadius: 50,
          margin: 10,
          backgroundColor: 'rgba(0,0,0,0.35)',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <View
          style={{
            padding: 5,
          }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: '700',
              color: '#fff',
            }}>
            {item.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
