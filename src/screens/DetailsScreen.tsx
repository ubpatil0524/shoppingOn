import {View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import React, {useRef, useState} from 'react';

import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import {RootStackScreenProps} from '../navigators/Rootnavigator';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

const DetailsScreen = ({
  navigation,
  route: {
    params: {item},
  },
}: RootStackScreenProps<'Details'>) => {

  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState(1);
  const [size, setSize] = useState(SIZES[0]);
 
  return (
    <View style={{flex: 1}}>
      <Image
        source={{
          uri: item.imageUrl,
        }}
        style={{flex: 1}}
      />
      <SafeAreaView
        edges={['top']}
        style={{position: 'absolute', top: 0, left: 0, right: 0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
            gap: 8,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
              borderColor: colors.text,
              borderWidth: 3,
              backgroundColor: colors.background,
            }}>
            <Icons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <View style={{flex: 1}} />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
              borderColor: colors.text,
              borderWidth: 3,
              backgroundColor: colors.background,
            }}>
            <Icons name="favorite-border" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
              borderColor: colors.text,
              borderWidth: 3,
              backgroundColor: colors.background,
            }}>
            <Icons name="add-shopping-cart" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <BottomSheet
        snapPoints={[64, 500]}
        index={0}
        detached
        style={{marginHorizontal: 20}}
        bottomInset={insets.bottom + 20}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: colors.background,
        }}>
        <View style={{padding: 16, gap: 16, flex: 1}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: colors.text}}>
            {item.title}
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', gap: 2}}>
                {new Array(5).fill('').map((_, i) => (
                  <Icons
                    key={i}
                    name={i < 3 ? 'star' : 'star-border'}
                    color="#facc15"
                    size={20}
                  />
                ))}
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.text,
                  opacity: 0.5,
                  marginTop: 4,
                }}>
                3.0(250k Reviews)
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                backgroundColor: colors.primary,
                padding: 6,
                borderRadius: 100,
              }}>
              <TouchableOpacity
                onPress={() => setCount(count => Math.max(1, count - 1))}
                style={{
                  backgroundColor: colors.card,
                  width: 34,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 34,
                }}>
                <Icons name="remove" size={20} color={colors.text} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: colors.background,
                }}>
                {count}
              </Text>
              <TouchableOpacity
                onPress={() => setCount(count => Math.min(10, count + 1))}
                style={{
                  backgroundColor: colors.card,
                  width: 34,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 34,
                }}>
                <Icons name="add" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text,
                  textTransform: 'uppercase',
                }}>
                Model is '6'1'', Size M
              </Text>
              <Text style={{color: colors.text, opacity: 0.5}}>Size guide</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 6,
                marginTop: 6,
              }}>
              {SIZES.map((s, i) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setSize(s)}
                  style={{
                    width: 44,
                    height: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: s === size ? colors.primary : colors.card,
                    borderRadius: 44,
                  }}>
                  <Text
                    style={{
                      color: s === size ? '#fff' : colors.text,
                      fontWeight: '600',
                      fontSize: 16,
                    }}>
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 6,
                color: colors.text,
              }}>
              Description
            </Text>
            <Text style={{color: colors.text, opacity: 0.75}} numberOfLines={3}>
              {item.desc}
            </Text>
          </View>
          <View style={{flex: 1}}></View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
            <View style={{flex: 1}}>
              <Text
                style={{color: colors.text, opacity: 0.75, marginBottom: 4}}>
                Total
              </Text>
              <Text
                style={{color: colors.text, fontSize: 18, fontWeight: '600'}}>
                ₹{item.price.toLocaleString()}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                // handleAddToCart()
              }}
              style={{
                backgroundColor: colors.primary,
                height: 64,
                borderRadius: 64,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexDirection: 'row',
                padding: 12,
                gap: 12,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.background,
                }}>
                Add to Cart
              </Text>

              <View
                style={{
                  backgroundColor: colors.card,
                  width: 40,
                  aspectRatio: 1,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icons name="arrow-forward" size={24} color={colors.text} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default DetailsScreen;
