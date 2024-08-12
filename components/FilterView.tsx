import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
// import {RangeSlider} from './RangeSlider';
import Icons from 'react-native-vector-icons/MaterialIcons';

const FilterView = () => {
  const {colors} = useTheme();
  const [sortByIndex, setsortByIndex] = useState(0);
  const [categoriesIndex, setCategoriesIndex] = useState(0);
  const [colorsIndex, setColorsIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);

  const theme = useTheme();
  const SortByList = [
    'Featured',
    'Price: Low to High',
    'Price: High to Low',
    'Best Sellers',
  ];

  const CategoriesList = ['Men', 'Boys', 'Women', 'Girls'];

  const ColorsList = [
    'Black',
    'Grey',
    'White',
    'Brown',
    'Beige',
    'Red',
    'Pink',
    'Yellow',
    'Multi',
  ];

  const SizeList = ['XS', 'S', 'S', 'M', 'L', 'XL', '2XL', '3XL', 'Free Size'];

  return (
    <View>
      <Text
        style={{
          fontWeight: '700',
          fontSize: 22,
          color: colors.text,
          padding: 10,
          textAlign: 'center',
        }}>
        Select Filter
      </Text>

      {/* Sort By filter  */}

      <View>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 20,
            color: colors.text,
            padding: 10,
          }}>
          Sort by
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={SortByList}
            horizontal
            contentContainerStyle={{paddingHorizontal: 10, gap: 10}}
            renderItem={({item, index}) => {
              const isSelected = sortByIndex === index;
              return (
                <TouchableOpacity
                  onPress={() => setsortByIndex(index)}
                  style={{
                    backgroundColor: isSelected ? colors.primary : colors.card,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 100,
                  }}>
                  <Text
                    style={{
                      color: isSelected ? colors.background : colors.text,
                      opacity: isSelected ? 1 : 0.5,
                      fontSize: 13,
                      fontWeight: '700',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </View>

      {/* Categories Filter  */}
      <View>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 20,
            color: colors.text,
            padding: 10,
          }}>
          Categories
        </Text>

        <FlatList
          data={CategoriesList}
          horizontal
          contentContainerStyle={{paddingHorizontal: 10, gap: 10}}
          renderItem={({item, index}) => {
            const isSelected = categoriesIndex === index;
            return (
              <TouchableOpacity
                onPress={() => setCategoriesIndex(index)}
                style={{
                  backgroundColor: isSelected ? colors.primary : colors.card,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 100,
                }}>
                <Text
                  style={{
                    color: isSelected ? colors.background : colors.text,
                    opacity: isSelected ? 1 : 0.5,
                    fontSize: 13,
                    fontWeight: '700',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Colors filter  */}
      <View>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 20,
            color: colors.text,
            padding: 10,
          }}>
          Colors
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={ColorsList}
            horizontal
            contentContainerStyle={{paddingHorizontal: 10, gap: 10}}
            renderItem={({item, index}) => {
              const isSelected = colorsIndex === index;
              return (
                <TouchableOpacity
                  onPress={() => setColorsIndex(index)}
                  style={{
                    backgroundColor: isSelected ? colors.primary : colors.card,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 100,
                  }}>
                  <Text
                    style={{
                      color: isSelected ? colors.background : colors.text,
                      opacity: isSelected ? 1 : 0.5,
                      fontSize: 13,
                      fontWeight: '700',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </View>

      {/* Sizes filter  */}
      <View>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 20,
            color: colors.text,
            padding: 10,
          }}>
          Sizes
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={SizeList}
            horizontal
            contentContainerStyle={{paddingHorizontal: 10, gap: 10}}
            renderItem={({item, index}) => {
              const isSelected = sizeIndex === index;
              return (
                <TouchableOpacity
                  onPress={() => setSizeIndex(index)}
                  style={{
                    backgroundColor: isSelected ? colors.primary : colors.card,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 100,
                  }}>
                  <Text
                    style={{
                      color: isSelected ? colors.background : colors.text,
                      opacity: isSelected ? 1 : 0.5,
                      fontSize: 13,
                      fontWeight: '700',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </View>

      {/* Price filter  */}
      <View>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 20,
            color: colors.text,
            padding: 10,
          }}>
          Price
        </Text>
      </View>

      {/* 
      <View>
        <RangeSlider sliderWidth={300} min={10} max={500} step={1} />
      </View> */}

      <TouchableOpacity
        style={{
          backgroundColor: theme.colors.primary,
          height: 64,
          borderRadius: 64,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: colors.background,
          }}>
          Apply Filter
        </Text>

        <View
          style={{
            backgroundColor: theme.colors.card,
            width: 40,
            aspectRatio: 1,
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 12,
            right: 12,
            bottom: 12,
          }}>
          <Icons name="arrow-forward" size={24} color={theme.colors.text} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FilterView;
