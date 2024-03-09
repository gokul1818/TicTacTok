import { Platform, StyleSheet } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { baseStyle } from '../../../utils/baseStyles/theme';
import { colors } from '../../../utils/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey3B,
    flex: 1,
  },
  mainContainer: {
    width: widthPercentageToDP('90%'),
    ...baseStyle.marginVertical('2%'),
    // ...baseStyle.marginHorizontal("2%"),
    ...baseStyle.screenContainer,
    ...baseStyle.alignSelfCenter,
  },
  headerContainer: [
    baseStyle.flexDirectionColumn,
    baseStyle.marginBottom('1%'),
  ],
  imgContainer: (selectedRoom, item, index) => ({
    ...baseStyle.flexDirectionColumn,
    ...baseStyle.marginRight('1%'),
    ...baseStyle.marginVertical('2%'),
    ...baseStyle.borderRadius8px,
    ...baseStyle.alignItemsCenter,
    borderWidth: 0.9,
    borderColor:
      selectedRoom?.item == item?.roomType
        ? colors.secondaryOrange
        : 'transparent',
    backgroundColor: colors.grey4D,
    height: heightPercentageToDP('18%'),
    width: widthPercentageToDP('37%'),
  }),
  img: {
    ...baseStyle.marginTop('3%'),
    width: widthPercentageToDP("15%"),
    height: widthPercentageToDP("15%"),
    borderRadius: 30,
  },
  roomType: {
    ...baseStyle.font16px,
    ...baseStyle.fontWeight600,
    ...baseStyle.marginTop('1%'),
    color: colors.white_F1,
  },
  deviceName: {
    ...baseStyle.font12px,
    ...baseStyle.fontWeight400,
    color: colors.greyC4,
  },
  list: {
    ...baseStyle.alignSelfCenter,
    width: widthPercentageToDP('90%'),
    height: heightPercentageToDP('50%'),
  },
  item: {
    ...baseStyle.font24px,
    ...baseStyle.fontWeight800,
    color: colors.WHITE_FA,
  },
  addOnView: {
    backgroundColor: colors.secondaryOrange,
    borderRadius: 20,
    width: widthPercentageToDP('13%'),
    height: widthPercentageToDP('6%'),

    ...baseStyle.flexDirectionRow,
    ...baseStyle.justifyContentCenter,
    ...baseStyle.alignItemsCenter,
  },
  add: {
    ...baseStyle.font14px,
    ...baseStyle.fontWeight600,
    ...baseStyle.marginRight('0.5%'),
    color: colors.WHITE_FA,
  },
  rooms: {
    ...baseStyle.flexDirectionRow,
    ...baseStyle.justifyContentSB,
    ...baseStyle.alignItemsCenter,
  },
  roomTxt: {
    ...baseStyle.font24px,
    ...baseStyle.fontWeight800,
    color: colors.WHITE_FA,
  },
  rbSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetContent: {
    padding: '5%',
  },
  label: {
    color: colors.grey3B,
    ...baseStyle.font20px,
    ...baseStyle.fontWeight600,
  },
  input: {
    borderColor: colors.grey31,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.black,
  },
  buttonStyle: {
    width: widthPercentageToDP('30%'),
    height: widthPercentageToDP('12%'),
    ...baseStyle.borderRadius4px,
    alignSelf: 'center',
    textAlign: 'center',
  },
  btnlabelstyle: {
    fontSize: 12,
  },
  timerbuttonStyle: {
    width: widthPercentageToDP("25%"),
    height: widthPercentageToDP("13%"),
    ...baseStyle.borderRadius8px,
    ...baseStyle.margin("1%")
  },
  deleteButtonStyle:{
    width: widthPercentageToDP("45%"),
    height: widthPercentageToDP("13%"),
    ...baseStyle.borderRadius8px,
    ...baseStyle.margin("1%"),
    backgroundColor:colors.red,
    
  },deleteButtonlabelstyle:{
    fontSize: 14,
  }
,
  greeting: {
    ...baseStyle.font26px,
    ...baseStyle.fontWeight700,
    color: colors.white_FF,
    fontFamily: 'robo',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between"
  },
  addMore:[
    baseStyle.alignItemsCenter,
    baseStyle.justifyContentCenter,
    {
    backgroundColor: colors.secondaryOrange,
    position: "absolute",
    bottom: 10,
    zIndex: 10,
    width: widthPercentageToDP("15%"),
    height: widthPercentageToDP("15%"),
    left: "41%",
    borderRadius:50
  }],
  addDev: [
    {
      width: widthPercentageToDP("8%"),
      height: widthPercentageToDP("8%"),
    }
  ]
  ,
  image: {
    ...baseStyle.marginTop('2%'),
    ...baseStyle.marginLeft('2%'),
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  editIcon: {
    position: 'absolute',
    right: 2,
    top: 2,
    width: widthPercentageToDP('5%'),
    height: heightPercentageToDP('5%'),
  },
  deviceView: {
    ...baseStyle.flexDirectionRow,
    ...baseStyle.alignItemsFE,
    ...baseStyle.justifyContentSA,
    ...baseStyle.marginTop('2%'),
  },
  deviceText: {
    ...baseStyle.font16px,
    ...baseStyle.fontWeight600,
    color: colors.white_F1,
  },
  editView: {
    position: 'absolute',
    right: 10,
    top: 5,
    width: widthPercentageToDP('5%'),
    height: heightPercentageToDP('5%'),
  },
  deviceIndex: {
    ...baseStyle.flexDirectionColumn,
    ...baseStyle.marginRight('2%'),
    ...baseStyle.marginVertical('1%'),
    ...baseStyle.borderRadius8px,
    backgroundColor: colors.grey4D,
    height: heightPercentageToDP('20%'),
    width: widthPercentageToDP('43%'),
  },
  welcome: {
    ...baseStyle.font14px,
    ...baseStyle.fontWeight400,
    color: colors.WHITE_FA,
  },
  modalView: {
    backgroundColor: colors.white,
    alignSelf: "center",
    minHeight: heightPercentageToDP("30%"),
    width: widthPercentageToDP("75%"),
    padding: "5%",
    justifyContent: "center",
    borderRadius: widthPercentageToDP("5%")
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default styles;
