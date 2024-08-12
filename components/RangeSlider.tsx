// import React from 'react';
// import {View, Text, StyleSheet, TextInput, TextInputProps} from 'react-native';
// import {
//   PanGestureHandler,
//   PanGestureHandlerGestureEvent,
// } from 'react-native-gesture-handler';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   useAnimatedGestureHandler,
//   useAnimatedProps,
// } from 'react-native-reanimated';

// interface RangeSliderProps {
//   sliderWidth: number;
//   min: number;
//   max: number;
//   step: number;
// }
// export const RangeSlider: React.FC<RangeSliderProps> = ({
//   sliderWidth,
//   min,
//   max,
//   step,
// }) => {
//   interface GestureContext {
//     startX: number;
//     [key: string]: unknown;
//   }
//   const Position = useSharedValue(0);
//   const Position2 = useSharedValue(sliderWidth);
//   const Opacity = useSharedValue(0);
//   const Opacity2 = useSharedValue(0);
//   const zIndex = useSharedValue(0);
//   const zIndex2 = useSharedValue(0);

//   const gestureHandler = useAnimatedGestureHandler<
//     PanGestureHandlerGestureEvent,
//     GestureContext
//   >({
//     onStart: (_, ctx) => {
//       ctx.startX = Position.value;
//     },
//     onActive: (e, ctx) => {
//       Opacity.value = 1;
//       if (ctx.startX + e.translationX < 0) {
//         Position.value = 0;
//       } else if (ctx.startX + e.translationX > Position2.value) {
//         Position.value = Position2.value;
//         zIndex.value = 1;
//         zIndex2.value = 0;
//       } else {
//         Position.value = ctx.startX + e.translationX;
//       }
//     },
//     onEnd: () => {
//       Opacity.value = 0;
//     },
//   });

//   const gestureHandler2 = useAnimatedGestureHandler<
//     PanGestureHandlerGestureEvent,
//     GestureContext
//   >({
//     onStart: (_, ctx) => {
//       ctx.startX = Position2.value;
//     },
//     onActive: (e, ctx) => {
//       Opacity2.value = 1;
//       if (ctx.startX + e.translationX > sliderWidth) {
//         Position2.value = sliderWidth;
//       } else if (ctx.startX + e.translationX < Position.value) {
//         Position2.value = Position.value;
//         zIndex.value = 0;
//         zIndex2.value = 1;
//       } else {
//         Position2.value = ctx.startX + e.translationX;
//       }
//     },
//     onEnd: () => {
//       Opacity2.value = 0;
//     },
//   });

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{translateX: Position.value}],
//     zIndex: zIndex.value,
//   }));

//   const animatedStyle2 = useAnimatedStyle(() => ({
//     transform: [{translateX: Position2.value}],
//     zIndex: zIndex2.value,
//   }));

//   const opacityStyle = useAnimatedStyle(() => ({
//     opacity: Opacity.value,
//   }));

//   const opacityStyle2 = useAnimatedStyle(() => ({
//     opacity: Opacity2.value,
//   }));

//   const silderStyle = useAnimatedStyle(() => ({
//     transform: [{translateX: Position.value}],
//     width: Position2.value - Position.value,
//   }));

//   const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
//   const minLabelText = useAnimatedProps<TextInputProps>(() => {
//     return {
//       value: `$${
//         min +
//         Math.floor(Position.value / (sliderWidth / ((min - max) / step))) * step
//       }`,
//     };
//   });

//   const maxLabelText = useAnimatedProps<TextInputProps>(() => {
//     return {
//       value: `$${
//         min +
//         Math.floor(Position2.value / (sliderWidth / ((min - max) / step))) *
//           step
//       }`,
//     };
//   });

//   return (
//     <View style={[styles.sliderContainer, {width: sliderWidth}]}>
//       <View style={[styles.silderBack, {width: sliderWidth}]} />
//       <Animated.View style={[styles.silderFront, silderStyle]} />

//       <PanGestureHandler onGestureEvent={gestureHandler}>
//         <Animated.View style={[styles.thumb, animatedStyle]}>
//           <Animated.View style={[styles.label, opacityStyle]}>
//             <AnimatedTextInput
//               style={styles.labelText}
//               defaultValue="0"
//               animatedProps={minLabelText}
//               editable={false}
//             />
//           </Animated.View>
//         </Animated.View>
//       </PanGestureHandler>

//       <PanGestureHandler onGestureEvent={gestureHandler2}>
//         <Animated.View style={[styles.thumb, animatedStyle2]}>
//           <Animated.View style={[styles.label, opacityStyle2]}>
//             <AnimatedTextInput
//               style={styles.labelText}
//               defaultValue="0"
//               animatedProps={maxLabelText}
//               editable={false}
//             />
//           </Animated.View>
//         </Animated.View>
//       </PanGestureHandler>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   sliderContainer: {
//     justifyContent: 'center',
//     alignSelf: 'center',
//   },
//   silderBack: {
//     marginTop: 40,
//     height: 8,
//     backgroundColor: 'grey',
//     borderRadius: 20,
//   },
//   silderFront: {
//     // marginTop: 10,
//     height: 8,
//     backgroundColor: 'blue',
//     borderRadius: 20,
//     position: 'relative',
//   },
//   thumb: {
//     position: 'absolute',
//     top: 33,
//     // left: 5,
//     width: 20,
//     height: 20,
//     backgroundColor: 'black',
//     borderColor: 'green',
//     borderWidth: 5,
//     borderRadius: 10,
//   },
//   label: {
//     position: 'absolute',
//     // top: 40,
//     bottom: 20,
//     backgroundColor: 'black',
//     borderRadius: 5,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   labelText: {
//     color: 'white',
//     padding: 5,
//     fontWeight: 'bold',
//     width: '100%',
//     fontSize: 16,
//   },
// });
