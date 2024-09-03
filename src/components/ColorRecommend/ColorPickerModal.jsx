import React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ColorPicker, { Panel1, HueSlider } from 'reanimated-color-picker';
import { COLOR } from '@styles/color';
import tinycolor from 'tinycolor2';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ColorPickerModal = ({
	isVisible,
	tempColor,
	setTempColor,
	onSave,
	onCancel,
}) => {
	const textColor = tinycolor(tempColor).isLight()
		? COLOR.GRAY_9
		: COLOR.GRAY_2;
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isVisible}
			onRequestClose={onCancel}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<ColorPicker
						value={tempColor}
						onComplete={selectedColor =>
							setTempColor(selectedColor.hex)
						}
						style={styles.colorPicker}>
						<View style={styles.panelContainer}>
							<Panel1 style={styles.panel} />
						</View>
						<View style={styles.hueSliderContainer}>
							<View style={styles.titleContainer}>
								<Text style={styles.korTitle}>선택할 색상</Text>
								<Text style={styles.engTitle}>
									Choose color
								</Text>
							</View>
							<HueSlider style={styles.hueSlider} />
						</View>
						<View style={styles.colorPreviewContainer}>
							<View style={styles.titleContainer}>
								<Text style={styles.korTitle}>활성화 색상</Text>
								<Text style={styles.engTitle}>
									Reanimated color
								</Text>
							</View>
							<View
								style={[
									styles.colorPreview,
									{ backgroundColor: tempColor },
								]}>
								<Text
									style={[
										styles.colorText,
										{ color: textColor },
									]}>
									{tempColor.toUpperCase()}
								</Text>
							</View>
						</View>
					</ColorPicker>

					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.cancelButton]}
							onPress={onCancel}>
							<Text style={styles.buttonText}>이전으로</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button, styles.saveButton]}
							onPress={onSave}>
							<Text style={styles.buttonText}>저장하기</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		width: 342,
		height: 512,
		backgroundColor: 'white',
		padding: 0,
		borderRadius: 8,
		alignItems: 'center',
		overflow: 'hidden',
	},
	colorPicker: {
		width: '100%',
		flex: 1,
	},
	panelContainer: {
		width: '100%',
		height: 347.69,
		marginBottom: 9,
	},
	panel: {
		flex: 1,
		borderRadius: 0,
	},
	hueSliderContainer: {
		alignItems: 'center',
		width: '100%',
	},
	hueSlider: {
		width: 306,
		// height: 18,
		marginBottom: 9,
		borderRadius: 8,
		opacity: 1,
		alignSelf: 'center',
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		width: 306,
	},
	korTitle: {
		fontSize: 12,
		fontWeight: 'bold',
		color: COLOR.GRAY_8,
		marginRight: 3,
	},
	engTitle: {
		fontSize: 10,
		color: COLOR.GRAY_6,
		marginTop: 3,
	},
	colorPreviewContainer: {
		marginBottom: 20,
		alignItems: 'center',
		width: '100%',
	},
	colorPreview: {
		height: 30,
		borderRadius: 8,
		width: 306,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
		alignSelf: 'center',
	},
	colorText: {
		color: '#333',
		textAlign: 'center',
		lineHeight: 18,
		fontWeight: 'bold',
		fontSize: 12,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 18,
		width: '100%',
	},
	button: {
		padding: 12,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	cancelButton: {
		backgroundColor: COLOR.GRAY_6,
	},
	saveButton: {
		backgroundColor: COLOR.PRIMARY,
	},
	buttonText: {
		color: COLOR.WHITE,
		fontWeight: 'bold',
		fontSize: 14,
	},
});

export default ColorPickerModal;
