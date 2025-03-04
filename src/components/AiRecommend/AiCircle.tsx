import React, { useRef, useEffect } from 'react';
import {
	TouchableOpacity,
	Animated,
	useWindowDimensions,
	ViewStyle,
	StyleProp,
} from 'react-native';
import tinycolor from 'tinycolor2';
import { COLOR } from '@styles/color';
import { heightScale } from '@utils/scaling';

const DISTANCE: number = 20; // 원과 화면 가장자리 간 거리
const BASE_DIAMETER = heightScale(205); // 기본 원 지름
const SMALL_SCALE = 0.5; // 작은 크기 비율
const LARGE_SCALE = 1.6; // 큰 크기 비율
const SMALL_OFFSET_SCALE = 0.5; // 작은 크기 원 화면에 떨어져있는 비율(-는 화면 바깥쪽으로 멀어지고, +는 화면 안쪽으로 멀어짐)
const BASE_OFFSET_SCALE = -0.1; // 중간 크기 원 화면에 떨어져있는 비율(-는 화면 바깥쪽으로 멀어지고, +는 화면 안쪽으로 멀어짐)
const LARGE_OFFSET_SCALE = -0.125; // 큰 크기 원 화면에 떨어져있는 비율(-는 화면 바깥쪽으로 멀어지고, +는 화면 안쪽으로 멀어짐)
const FONTSIZE_LARGE_SCALE = 1; // 가장 큰 원에 들어가는 세부설명 폰트 사이즈 비율
const FONTSIZE_MEDIUM_SCALE = 0.5; // 중간크기 원에 들어가는 세부설명 폰트 사이즈 비율
const FONTSIZE_SMALL_SCALE = 0; // 작은크기 원에 들어가는 세부설명 폰트 사이즈 비율

// 원 지름(중간 크기 원은 안드로이드 에뮬레이터 미디엄폰 기준 205)
const diameter: number = BASE_DIAMETER;
const smallDiameter: number = SMALL_SCALE * diameter;
const largeDiameter: number = LARGE_SCALE * diameter;

// 첫번째와 마지막 원이 아래위로 화면에서 떨어져 있는 정도(-는 화면 바깥쪽으로 멀어지고, +는 화면 안쪽으로 멀어짐)
const smallVerticalOffset: number = SMALL_OFFSET_SCALE * smallDiameter;
const mediumVerticalOffset: number = BASE_OFFSET_SCALE * diameter;
const largeVerticalOffset: number = LARGE_OFFSET_SCALE * largeDiameter;

interface AiCircleProps {
	type: string; // 타입에 맞게 수정
	number: number;
	colorCode: string[]; // 색상 코드의 타입
	korColorName: string[]; // 한국어 색상 이름
	engColorName: string[]; // 영어 색상 이름
	colorShort: string[]; // 색상 짧은 이름
	colorDescription: string[]; // 색상 설명
	isSelected: string[]; // 선택 여부
	setIsSelected: React.Dispatch<React.SetStateAction<string[]>>; // 선택 상태 설정 함수
	containerHeight: number; // 컨테이너 높이
}

const AiCircle = ({
	type,
	number,
	colorCode,
	korColorName,
	engColorName,
	colorShort,
	colorDescription,
	isSelected,
	setIsSelected,
	containerHeight,
}: AiCircleProps) => {
	const { width: SCREEN_WIDTH } = useWindowDimensions();

	// AiCircle 크기 나타내는 Animated.Value 객체 생성
	const animatedSize = useRef(new Animated.Value(1)).current;

	// AiCircle 내 글자 크기 나타내는 Animated.Value 객체 생성
	const animatedFontSize = useRef(new Animated.Value(0)).current;

	// 원 사이 수직 거리
	const distanceBetweenCircles = (size: string): number => {
		switch (size) {
			case 'medium':
				const tempMedium = diameter + 2 * mediumVerticalOffset;
				return (containerHeight - tempMedium) / 4;
			case 'large':
				const tempLarge = largeDiameter + 2 * largeVerticalOffset;
				return (containerHeight - tempLarge) / 4;
			default:
				const tempSmall = smallDiameter + 2 * smallVerticalOffset;
				return (containerHeight - tempSmall) / 4;
		}
	};

	useEffect(() => {
		// parallel로 애니메이션 동시 진행
		Animated.parallel([
			// spring으로 원 크기 변화 시 튕기는 듯한 모션
			Animated.spring(animatedSize, {
				toValue:
					isSelected[number] === 'large'
						? LARGE_SCALE
						: isSelected[number] === 'small'
						? SMALL_SCALE
						: 1,
				useNativeDriver: false,
			}),
			// 폰트 크기 애니메이션은 영역 밖으로 튀는 걸 방지하기 위해 timing으로 선형적 변화
			Animated.timing(animatedFontSize, {
				toValue:
					isSelected[number] === 'large'
						? FONTSIZE_LARGE_SCALE
						: isSelected[number] === 'small'
						? FONTSIZE_SMALL_SCALE
						: FONTSIZE_MEDIUM_SCALE,
				duration: 300,
				useNativeDriver: false,
			}),
		]).start();
	}, [isSelected]);

	const korTextColor = (color: string): string => {
		return tinycolor(color).isLight() ? COLOR.GRAY_10 : COLOR.WHITE;
	};
	const engTextColor = (color: string) => {
		return tinycolor(color).isLight() ? COLOR.GRAY_9 : COLOR.GRAY_2;
	};

	// 원 터치 시 크기 상태 관리 함수
	const handlePress = () => {
		setIsSelected(prevSelected => {
			if (prevSelected[number] === 'large') {
				// large누르면 전부 medium으로 set
				return prevSelected.map(() => 'medium');
			} else if (prevSelected[number] === 'small') {
				// small누르면 자신은 large로 나머지는 small
				return prevSelected.map((_, index) =>
					index === number ? 'large' : 'small',
				);
			} else {
				// medium누르면 자신은 large로 나머지 small
				return prevSelected.map((_, index) =>
					index === number ? 'large' : 'small',
				);
			}
		});
	};

	// 원 영역 스타일
	// interpolate를 통해 애니메이션 입력 값의 범위를 다른 출력 값의 범위로 변환
	const circleStyle: StyleProp<ViewStyle> = {
		position: 'absolute',
		...(type == 'left'
			? {
					left: animatedSize.interpolate({
						inputRange: [SMALL_SCALE, 1, LARGE_SCALE],
						outputRange: [
							DISTANCE - SCREEN_WIDTH * 0.5,
							-DISTANCE - SCREEN_WIDTH * 0.5,
							-DISTANCE - SCREEN_WIDTH * 0.5,
						],
					}),
			  }
			: {
					right: animatedSize.interpolate({
						inputRange: [SMALL_SCALE, 1, LARGE_SCALE],
						outputRange: [
							DISTANCE - SCREEN_WIDTH * 0.5,
							-DISTANCE - SCREEN_WIDTH * 0.5,
							-DISTANCE - SCREEN_WIDTH * 0.5,
						],
					}),
			  }),
		top: animatedSize.interpolate({
			inputRange: [SMALL_SCALE, 1, LARGE_SCALE],
			outputRange: [
				smallVerticalOffset + number * distanceBetweenCircles('small'),
				mediumVerticalOffset +
					number * distanceBetweenCircles('medium'),
				largeVerticalOffset + number * distanceBetweenCircles('large'),
			],
		}),
		width: animatedSize.interpolate({
			inputRange: [SMALL_SCALE, 1, LARGE_SCALE],
			outputRange: [smallDiameter, diameter, largeDiameter],
		}),
		height: animatedSize.interpolate({
			inputRange: [SMALL_SCALE, 1, LARGE_SCALE],
			outputRange: [smallDiameter, diameter, largeDiameter],
		}),
		borderRadius: 400,
		backgroundColor: colorCode[number],
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	};

	return (
		<TouchableOpacity
			onPressOut={handlePress}
			activeOpacity={0.7}
			style={{
				zIndex: -1,
			}}>
			<Animated.View style={circleStyle}>
				<Animated.Text
					style={{
						fontFamily: 'Pretendard-Bold',
						fontSize: animatedFontSize.interpolate({
							inputRange: [0, 0.5, 1],
							outputRange: [
								heightScale(14),
								heightScale(20),
								heightScale(26),
							],
						}),
						color: korTextColor(colorCode[number]),
					}}>
					{korColorName[number]}
				</Animated.Text>
				<Animated.Text
					style={{
						fontFamily: 'Pretendard-Medium',
						fontSize: animatedFontSize.interpolate({
							inputRange: [0, 0.5, 1],
							outputRange: [
								heightScale(12),
								heightScale(16),
								heightScale(20),
							],
						}),
						color: engTextColor(colorCode[number]),
						marginTop: -2,
						marginBottom: 5,
					}}>
					{engColorName[number]}
				</Animated.Text>
				<Animated.Text
					style={{
						fontFamily: 'Pretendard-Regular',
						fontSize: animatedFontSize.interpolate({
							inputRange: [0, 0.5, 1],
							outputRange: [0, heightScale(16), heightScale(18)],
						}),
						color: korTextColor(colorCode[number]),
						paddingHorizontal: 30,
					}}>
					{isSelected[number] === 'large'
						? colorDescription[number]
						: colorShort[number]}
				</Animated.Text>
			</Animated.View>
		</TouchableOpacity>
	);
};

export default AiCircle;
