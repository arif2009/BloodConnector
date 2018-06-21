'use strict';
import { StyleSheet } from 'react-native';
module.exports = StyleSheet.create({
    bgColor: {backgroundColor: '#ffcccc'},

    hRed:{backgroundColor: '#e60000'},

    nabBg: {backgroundColor: '#ff0000'},

    txtColor: {color: '#fff'},

    txtBlue:{color: '#0000ff'},

    txtRed:{color: '#ff0000'},

    txtWarning:{color: '#ffc107'},

    txtDanger:{color: '#dc3545'},

    borderBottom0:{borderBottomWidth:0},

    selfAlignCenter:{alignSelf: 'center'},

    p:{padding:10},
    pL:{ paddingLeft:10},
    pR:{ paddingRight:10},
    pLg:{ padding:15},

    msm:{margin:5},
    mLg:{margin:15},

    mb:{marginBottom: 10},
    mbSm:{marginBottom:4},
    ml:{marginLeft: 10},

    mr:{marginRight: 10},

    mlLg:{marginLeft: 15},

    mrLg:{marginRight: 15},

    mt:{marginTop: 10},

    mtLg:{marginTop: 15},

    footerBg: {backgroundColor: '#ff8080',justifyContent:'center'},

    budgetTxt: {color: '#fff',fontSize: 18,fontWeight: 'bold'},

    sceneTitle: {alignSelf: 'center',color: '#fff'},

    txtMedium: {fontSize: 16,fontWeight: '600'},

    txtBold: {fontWeight: 'bold'},

    txtBolder: {fontSize: 18,fontWeight: 'bold'},

    drawerContainer: {flex: 1,backgroundColor: '#ffcccc'},

    drawerHeader: {borderBottomWidth: 1,flexDirection: 'column',marginTop: 5,paddingBottom: 5},

    drawerBtnContainer:{paddingLeft:15, paddingTop:10, paddingBottom:10},

    drawerBtnTxt: {fontSize: 18,color: '#404040'},

    drawerIcon:{fontSize: 22,color: '#404040'},

    errorTextStyle: {fontSize: 20,alignSelf: 'center',color: '#ff0000'},

    homeTitle: {
        justifyContent: 'space-around', 
        paddingTop: 10, 
        paddingBottom: 10, 
        backgroundColor:'#fff', 
        borderColor: '#ffcccc'
    },
    btnBlock:{
        padding:10, 
        height:45, 
        overflow:'hidden', 
        width:'95%', 
        alignSelf: 'center', 
        borderRadius:4, 
        backgroundColor: '#0000ff'
    },
    itemStyle: {borderBottomWidth: 1,borderColor: '#fff'},
    button: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
        height: 40,
        borderRadius:4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    bgContainer: { flex:1, width: null, height: null },
    
    modal: {
      justifyContent: 'center', //justifyContent: "center", "space-between", "flex-end", "space-around", "flex-start"
      alignItems: 'center', //'flex-start', 'flex-end', 'center', 'stretch', 'baseline'
      borderRadius:4,
      height: null,
    },
    tAndCmodal: {
      width: 300
    },
    detailsmodal: {
        top:150,
        width: 300
      }
});