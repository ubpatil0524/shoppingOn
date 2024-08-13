import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const PriceRangeSelector = ({
  maxPrice,
  startPrice,
  endPrice,
  onStartPriceChange,
  onEndPriceChange,
}: {
  minPrice: number;
  maxPrice: number;
  startPrice: number;
  endPrice: number;
  onStartPriceChange: (value: number) => void;
  onEndPriceChange: (value: number) => void;
}) => {
  const theme = useTheme();
  const [barwidth, setBarWidth] = useState(0);
  const leftHandlePos = useSharedValue(0);
  const rightHandlePos = useSharedValue(0);
  const leftHandleGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      prevPos: number;
    }
  >({
    onStart(event, context) {
      context.prevPos = leftHandlePos.value;
    },
    onActive(event, context) {
      leftHandlePos.value = Math.min(
        rightHandlePos.value,
        Math.max(0, context.prevPos + event.translationX),
      );

      runOnJS(onStartPriceChange)(
        Math.round((maxPrice / barwidth) * leftHandlePos.value),
      );
    },
  });

  const rightHandleGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      prevPos: number;
    }
  >({
    onStart(event, context) {
      context.prevPos = rightHandlePos.value;
    },
    onActive(event, context) {
      rightHandlePos.value = Math.min(
        barwidth,
        Math.max(leftHandlePos.value, context.prevPos + event.translationX),
      );
      runOnJS(onEndPriceChange)(
        Math.round((maxPrice / barwidth) * rightHandlePos.value),
      );
    },
  });

  const leftHandleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: leftHandlePos.value,
      },
    ],
  }));
  const rightHandleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: rightHandlePos.value,
      },
    ],
  }));

  useEffect(() => {
    if (barwidth === 0) return;
    leftHandlePos.value = (startPrice * barwidth) / maxPrice;
    rightHandlePos.value = (endPrice * barwidth) / maxPrice;
  }, [barwidth]);

  const barHighlightStyle = useAnimatedStyle(() => ({
    left: leftHandlePos.value,
    right: barwidth - rightHandlePos.value,
  }));

  return (
    <View style={{paddingHorizontal: 24}}>
      <Text style={{marginBottom: 24}}>Price Selector</Text>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: theme.colors.border,
          position: 'relative',
          marginBottom: 16,
        }}
        onLayout={event => {
          setBarWidth(event.nativeEvent.layout.width);
        }}>
        <Animated.View
          style={[
            barHighlightStyle,
            {
              position: 'absolute',
              height: '100%',
              backgroundColor: theme.colors.primary,
            },
          ]}
        />
        <PanGestureHandler onGestureEvent={leftHandleGesture}>
          <Animated.View
            style={[leftHandleStyle, {position: 'absolute', zIndex: 10}]}>
            <SliderHandle label={`₹${startPrice}`} />
          </Animated.View>
        </PanGestureHandler>
        <PanGestureHandler onGestureEvent={rightHandleGesture}>
          <Animated.View
            style={[rightHandleStyle, {position: 'absolute', zIndex: 10}]}>
            <SliderHandle label={`₹${endPrice}`} />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
};

export default PriceRangeSelector;

const SliderHandle = ({label}: {label: string}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        position: 'absolute',
        left: '10%',
        height: 24,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        borderColor: theme.colors.primary,
        borderWidth: 2,
        backgroundColor: theme.colors.background,
        transform: [
          {
            translateX: -12,
          },
          {
            translateY: -12,
          },
        ],
      }}>
      <View
        style={{
          width: 3,
          height: 3,
          borderRadius: 10,
          backgroundColor: theme.colors.primary,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 24,
          width: 200,
          alignItems: 'center',
        }}>
        <View style={{backgroundColor: theme.colors.card}}>
          <Text numberOfLines={1} style={{color: theme.colors.text}}>
            {label}
          </Text>
        </View>
      </View>
    </View>
  );
};
