import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const Socks = ({ width = 136, height = 82, fill = '#FBFBFB' }) => (
	<Svg width={width} height={height} viewBox="0 0 136 82" fill="none">
		<Path
			d="M1 12.707C4.56791 27.0145 8.97298 43.089 8.45474 46.4625C7.60761 52.1052 7.0495 53.802 9.85997 58.3201C12.6704 62.8382 4.25896 68.4809 2.01656 74.6958C-0.225845 80.9108 14.0757 80.9007 21.0819 80.9007C28.0882 80.9007 22.4772 72.999 20.7929 65.9407C19.1086 58.8824 25.2777 60.5691 21.6301 50.6895C18.7698 42.9384 20.2049 24.2534 21.2314 11.1006C21.2314 11.1006 13.5873 17.6268 1 12.707Z"
			fill={fill}
			stroke="black"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<Path
			d="M112.721 58.0992C113.279 62.055 114.366 67.1354 113.618 70.8604C112.871 74.5853 110.628 70.8604 110.628 76.503C110.628 82.1457 125.956 80.6396 132.684 78.7521C139.411 76.8645 130.431 60.6795 128.189 57.2959C125.946 53.9124 130.312 50.7798 126.574 44.3741C123.315 38.8117 117.884 22.4963 115.283 1C104.659 6.57236 98.938 4.65465 98.938 4.65465C103.393 12.476 108.595 22.2453 114.047 40.9905C116.02 47.7978 112.163 54.1734 112.721 58.0992Z"
			fill={fill}
			stroke="black"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</Svg>
);
