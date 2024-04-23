// import { colors } from '@/themeColors';
// import BottomSheet, {
//     BottomSheetSectionList,
//     BottomSheetFlatList,
//     BottomSheetScrollView
// } from '@gorhom/bottom-sheet';
// import {
//     Button,
//     Icon,
//     IconElement,
//     List,
//     ListItem,
//     Text
// } from '@ui-kitten/components';
// import { styled } from 'nativewind';
// import React, { useMemo, useRef, useState } from 'react';
// const StyledText = styled(Text)
// const StyledListItem = styled(ListItem)

// interface IListItem {
//     title: string;
//     description: string;
// }

// const data = new Array(20).fill({
//     title: 'Title for Item',
//     description: 'Description for Item',
// });
// const ExpandableStopsList = () => {

//     const snapPoints = useMemo(() => ['80%', '85%', '90%'], []);

//     const renderItemAccessory = (): React.ReactElement => (
//         <Icon name="chevron-right" style={{ width: 32, height: 32 }} fill={colors.light.darkGrey} />
//     );

//     const renderItemIcon = (props): IconElement => (
//         <Icon {...props} name="radio-button-off" />
//     );

//     const renderItem = ({
//         item,
//         index,
//     }: {
//         item: IListItem;
//         index: number;
//     }): React.ReactElement => (
//         <StyledListItem
//             title={`${item.title} ${index + 1}`}
//             description={`${item.description} ${index + 1}`}
//             accessoryLeft={renderItemIcon}
//             accessoryRight={renderItemAccessory}
//             className="!bg-white h-20 px-2 border-2 border-teal-900 rounded-lg my-1 opacity-40"
//         />
//     );
//     return (
//         <BottomSheet index={1} snapPoints={snapPoints} >
//             <>
//                 <StyledText className='text-lg m-2 '>Paradas de la ruta </StyledText>

//                 <BottomSheetScrollView className="px-2">
//                     {data.map((item, index) => (
//                         <>
//                             {renderItem({ item, index })}</>
//                     ))}
//                 </BottomSheetScrollView>
//             </>
//         </BottomSheet>
//     );
// };

// export default ExpandableStopsList;
