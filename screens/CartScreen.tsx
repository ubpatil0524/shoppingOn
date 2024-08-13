import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-element-dropdown';

const SizeData = [
  {label: 'Size 10', value: '1'},
  {label: 'Size 12', value: '2'},
  {label: 'Size 14', value: '3'},
  {label: 'Size 18', value: '4'},
  {label: 'Size 20', value: '5'},
  {label: 'Size 22', value: '6'},
  {label: 'Size 24', value: '7'},
  {label: 'Size 26', value: '8'},
  {label: 'Size 28', value: '9'},
  {label: 'Size 30', value: '10'},
];
const CartScreen = () => {
  const {colors} = useTheme();

  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <>
      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '700',
            color: colors.text,
            textAlign: 'center',
            padding: 15,
          }}>
          My Bag
        </Text>
      </View>

      <View
        style={{
          elevation: 2,
          shadowColor: 'black',
          alignSelf: 'center',
          flexDirection: 'row',
          borderRadius: 5,
          padding: 10,
          margin: 8,
        }}>
        <View style={{flexDirection: 'column'}}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={{width: 120, height: 120, margin: 10, borderRadius: 5}}
          />

          {/* DropDown */}

          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={SizeData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Size' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'column',
            gap: 5,
          }}>
          <Text
            style={{
              fontSize: 22,
              color: colors.text,
              fontWeight: '600',
              flexWrap: 'wrap',
            }}>
            Puma Everyday Hussle
          </Text>
          <Text style={{fontSize: 18}}>Mens</Text>
          <Text style={{fontSize: 20, color: colors.text, fontWeight: 'bold'}}>
            ₹90000 x 1
          </Text>
          <View style={{flexDirection: 'row'}}>
            {new Array(5).fill('').map((_, i) => (
              <Icons
                key={i}
                name={i < 3 ? 'star' : 'star-border'}
                color="#facc15"
                size={20}
              />
            ))}
          </View>
          <Text style={{fontSize: 16}}>Delivery by Aug 16, Fri</Text>
        </View>
      </View>

      <View style={{flex: 1}} />

      {/* Total price & Checkout   */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
          backgroundColor: colors.primary,
          borderWidth: 1,
          borderTopLeftRadius: 10,
          borderTopEndRadius: 10,
        }}>
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              color: colors.background,
              fontSize: 20,
            }}>
            Total Price
          </Text>
          <Text
            style={{color: colors.background, fontSize: 25, fontWeight: '700'}}>
            ₹ 90000
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: colors.background,
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
              fontSize: 18,
              fontWeight: '700',
              color: colors.text,
            }}>
            Checkout
          </Text>

          <View
            style={{
              backgroundColor: colors.text,
              width: 40,
              aspectRatio: 1,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icons name="arrow-forward" size={24} color={colors.background} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CartScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 40,
    width: 120,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
