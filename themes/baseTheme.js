import {
blue500, blue700,
grey100, grey300, grey400, grey500,
pinkA200,
white, darkBlack, fullBlack
} from "material-ui/styles/colors";
import {fade} from "material-ui/utils/colorManipulator";

module.exports = {
	baseTheme: {
		spacing: {
			iconSize: 24,
			desktopGutter: 24,
			desktopGutterMore: 32,
			desktopGutterLess: 16,
			desktopGutterMini: 8,
			desktopKeylineIncrement: 64,
			desktopDropDownMenuItemHeight: 32,
			desktopDropDownMenuFontSize: 15,
			desktopDrawerMenuItemHeight: 48,
			desktopSubheaderHeight: 48,
			desktopToolbarHeight: 56
		},
		fontFamily: "Roboto, sans-serif",
		palette: {
			primary1Color: blue500,
			primary2Color: blue700,
			primary3Color: grey400,
			accent1Color: pinkA200,
			accent2Color: grey100,
			accent3Color: grey500,
			textColor: darkBlack,
			alternateTextColor: white,
			canvasColor: white,
			borderColor: grey300,
			disabledColor: fade(darkBlack, 0.3),
			pickerHeaderColor: blue500,
			clockCircleColor: fade(darkBlack, 0.07),
			shadowColor: fullBlack
		}
	}
};
