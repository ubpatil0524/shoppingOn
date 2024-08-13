import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import MasonryList from 'reanimated-masonry-list';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomBackdrop from '../components/CustomBackdrop';
import FilterView from '../components/FilterView';
import {TabsStackScreenProps} from '../navigators/TabsNavigator';

const HomeScreen = ({navigation}: TabsStackScreenProps<'Home'>) => {
  const {colors} = useTheme();

  const categories = [
    'Clothing',
    'Shoes',
    'Accessories',
    'Watches',
    'many more',
  ];

  interface Item {
    imageUrl: string;
    title: string;
    price: number;
  }

  const MESONARY_LIST_DATA: Item[] = [
    {
      imageUrl:
        'https://images.unsplash.com/photo-1503001358144-8d7f2c1db9f5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Puma Everyday ',
      price: 160,
    },
    {
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Puma  Hussle',
      price: 260,
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1496346236646-50e985b31ea4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: ' Everyday Hussle',
      price: 360,
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1508243771214-6e95d137426b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: ' Everyday Hussle 2',
      price: 460,
    },
    {
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1670090780560-bcb7ee7da281?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Puma Everyday Hussle 3',
      price: 560,
    },
    {
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Puma Everyday Hussle 7',
      price: 660,
    },
  ];

  const [categoryIndex, setCategoryIndex] = useState(0);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openFilterModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleAddCart = () => {
    console.log('Added');
  };

  return (
    <ScrollView>
      <SafeAreaView style={{paddingVertical: 24, gap: 24}}>
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
          <TouchableOpacity
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
            <Text
              style={{flex: 1, fontSize: 16, color: colors.text, opacity: 0.5}}>
              Search
            </Text>
          </TouchableOpacity>
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
        <View style={{paddingHorizontal: 24}}>
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
          <View style={{flexDirection: 'row', height: 200, gap: 12}}>
            <View style={{flex: 1}}>
              <Card
                onPress={() => {
                  navigation.navigate('Details', {id: '123'});
                }}
                price={160}
                imageUrl="https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </View>
            <View style={{flex: 1, gap: 12}}>
              <Card
                onPress={() => {
                  navigation.navigate('Details', {id: '234'});
                }}
                price={280}
                imageUrl="https://images.unsplash.com/photo-1512663150964-d8f43c899f76?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <Card
                onPress={() => {
                  navigation.navigate('Details', {id: '345'});
                }}
                price={370}
                imageUrl="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </View>
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
                onPress={() => setCategoryIndex(index)}
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
          data={MESONARY_LIST_DATA}
          keyExtractor={(item, i) => i.toString()} // Use index as key
          numColumns={2}
          contentContainerStyle={{paddingHorizontal: 12}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, i}) => (
            <View style={{padding: 6}}>
              <View
                style={{
                  aspectRatio: i === 0 ? 1 : 2 / 3,
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: 'red',
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
                    <View
                      style={{
                        backgroundColor: colors.background,
                        borderRadius: 100,
                        height: 32,
                        aspectRatio: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icons
                        name="favorite-border"
                        size={20}
                        color={colors.text}
                      />
                    </View>
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
            </View>
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
  price,
  imageUrl,
  onPress,
}: {
  price: number;
  imageUrl: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 24,
      }}>
      <Image
        source={{
          uri: imageUrl,
        }}
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
          position: 'absolute',
          left: 16,
          top: 16,
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: 'rgba(0,0,0,0.25)',
          borderRadius: 100,
        }}>
        <Text style={{fontSize: 14, fontWeight: '600', color: '#fff'}}>
          ₹ {price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
