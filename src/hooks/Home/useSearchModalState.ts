import { useEffect, useState } from 'react';
import { useColorName } from '@hooks/index';
import { colorConverter, isValidKorean, compactKeyword } from '@utils/Home';
import { INPUT_TYPES, InputValuesType } from '@typesStore/Home/inputTypes';

const useSearchModalState = () => {
	const initValue = {
		part1: '',
		part2: '',
		part3: '',
		part4: '',
	};

	const [selectedLabel, setSelectedLabel] = useState<string>(
		INPUT_TYPES.COLOR_NAME,
	);
	const [inputValues, setInputValues] = useState<InputValuesType>(initValue);
	const [searchNameList, setSearchNameList] = useState<
		{
			distance: number | undefined;
			name: string;
			hex: string;
			korean_name: string;
		}[]
	>([]);
	const [isKeywordKor, setIsKeywordKor] = useState<boolean>(false);
	const { getSearchColorList } = useColorName();

	const handlePressLabel = (label: string) => setSelectedLabel(label);

	// 검색어 입력 시 색상 리스트 업데이트
	useEffect(() => {
		const updateSearchList = () => {
			const keyword = compactKeyword(inputValues.part1);
			if (!keyword) {
				setSearchNameList([]);
				return;
			}
			setIsKeywordKor(isValidKorean(keyword));
			setSearchNameList(
				getSearchColorList(isValidKorean(keyword), keyword),
			);
		};
		if (selectedLabel === INPUT_TYPES.COLOR_NAME) {
			updateSearchList();
		} else {
			setSearchNameList([]); // 다른 검색 타입 선택 시 리스트 초기화
		}
	}, [inputValues.part1, selectedLabel]);

	useEffect(() => {
		setInputValues(initValue);
	}, [selectedLabel]);

	// 검색 버튼 터치 시
	const getHexValue = () => {
		const convertValueToHex =
			colorConverter[selectedLabel] || ((values: string[]) => values);
		const hexValue = convertValueToHex(inputValues, searchNameList);
		if (hexValue) return hexValue;
		else console.log('fail');
	};

	// 자동완성 검색 리스트 터치 시
	const handlePressSearchList = (label: string) => {
		setInputValues(prevValues => ({ ...prevValues, part1: label }));
		// 자동완성 터치하면 숨기기?
	};

	return {
		selectedLabel,
		inputValues,
		setInputValues,
		searchNameList,
		isKeywordKor,
		handlePressLabel,
		getHexValue,
		handlePressSearchList,
	};
};

export default useSearchModalState;
