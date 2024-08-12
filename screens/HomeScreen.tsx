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

const HomeScreen = () => {
  const {colors} = useTheme();

  const categories = [
    'Clothing',
    'Shoes',
    'Accessories',
    'Watches',
    'many more',
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
            <Icons name="notifications" size={24} color={colors.text} />
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
              <Card />
            </View>
            <View style={{flex: 1, gap: 12}}>
              <Card />
              <Card />
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
          data={[1, 2, 3, 4, 5, 6]}
          keyExtractor={item => item.toString()}
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
                    uri: 'https://images.unsplash.com/photo-1496346530827-534816eed3be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
                      Puma Everyday Hustle
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
                      ₹560
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

const Card = () => {
  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 24,
      }}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
          ₹530
        </Text>
      </View>
    </View>
  );
};
