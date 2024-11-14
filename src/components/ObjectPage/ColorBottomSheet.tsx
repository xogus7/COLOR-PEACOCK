import React from 'react';
import {
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

import { heightScale } from '@utils/scaling';
import { useBottomSheetHandler } from '@hooks/ObjectScreen';
import { CustomHandler } from '@components/ObjectPage';

const colorContainer = require('@images/objectitems/background/cricle__wrapper.png');

interface ColorBottomSheetProps {
	colors: string[];
}

const ColorBottomSheet: React.FC<ColorBottomSheetProps> = ({ colors }) => {
	const { bottomSheetRef, handleColorSelect } = useBottomSheetHandler();

	return (
		<View style={styles.colorContainer}>
			<BottomSheet
				ref={bottomSheetRef as React.RefObject<BottomSheetMethods>}
				snapPoints={[heightScale(40), heightScale(108)]}
				enableHandlePanningGesture={false}
				handleComponent={CustomHandler}
				backgroundComponent={null}>
				<ImageBackground
					source={colorContainer}
					style={{
						flex: 1,
					}}>
					<View style={styles.colorWrapper}>
						{colors.map((color, index) => (
							<TouchableOpacity
								key={index}
								style={[
									styles.colorBox,
									{ backgroundColor: color },
								]}
								onPress={() => handleColorSelect(color)}
							/>
						))}
					</View>
				</ImageBackground>
			</BottomSheet>
		</View>
	);
};

const styles = StyleSheet.create({
	colorContainer: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: 1000,
	},
	colorWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingTop: heightScale(20),
	},
	colorBox: {
		width: heightScale(60),
		height: heightScale(24),
		borderRadius: 4,
	},
});
export default ColorBottomSheet;