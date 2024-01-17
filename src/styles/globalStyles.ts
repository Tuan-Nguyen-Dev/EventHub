import { StyleSheet } from 'react-native';
import { appColors } from '../constants/appColor';
import { fontFamilies } from '../constants/fontFamilies';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.white,
    },

    text: {
        fontSize: 14,
        color: appColors.text,
        fontFamily: fontFamilies.regular,
    },

    button: {
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColors.white,
        paddingHorizontal: 16,
        paddingVertical: 16,
        minHeight: 56,
        flexDirection: 'row',
    },
});
