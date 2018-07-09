'use strict';
import { StyleSheet } from 'react-native';
module.exports = StyleSheet.create({

    txtColor: {color: '#fff'},
    txtBlue:{color: '#0000ff'},
    txtRed:{color: '#ff0000'},
    txtWarning:{color: '#ffc107'},
    txtDanger:{color: '#dc3545'},
    txtSuccess:{color: '#28a745'},
    txtMedium: {fontSize: 16,fontWeight: '600'},
    txtBold: {fontWeight: 'bold'},
    txtBolder: {fontSize: 18,fontWeight: 'bold'},

    font12:{fontSize: 12},
    font15:{fontSize:15},
    font17:{fontSize:17},

    p:{padding:10},
    pL:{ paddingLeft:10},
    pR:{ paddingRight:10},
    pLg:{ padding:15},

    msm:{margin:5},
    ml5:{marginLeft:5},
    mr5:{marginRight:5},
    mb5:{marginBottom: 5},
    mLg:{margin:15},
    mb:{marginBottom: 10},
    mbSm:{marginBottom:4},
    ml:{marginLeft: 10},
    mr:{marginRight: 10},
    mlLg:{marginLeft: 15},
    mrLg:{marginRight: 15},
    mt:{marginTop: 10},
    mtLg:{marginTop: 15},

    bgColor: {backgroundColor: '#ffcccc'},
    hRed:{backgroundColor: '#e60000'},
    bgSoftRed:{backgroundColor: '#DD5144'},
    nabBg: {backgroundColor: '#ff0000'},

    borderBottom0:{borderBottomWidth:0},

    selfAlignCenter:{alignSelf: 'center'},

    row:{flexDirection: 'row'},

    footerBg: {backgroundColor: '#ff8080',justifyContent:'center'},

    budgetTxt: {color: '#fff',fontSize: 18,fontWeight: 'bold'},

    sceneTitle: {alignSelf: 'center',color: '#fff'},

    drawerContainer: {flex: 1,backgroundColor: '#ffcccc'},

    drawerHeader: {borderBottomWidth: 1,flexDirection: 'column',marginTop: 5,paddingBottom: 5},

    drawerBtnContainer:{paddingLeft:15, paddingTop:10, paddingBottom:10},

    drawerBtnTxt: {fontSize: 18,color: '#404040'},

    drawerIcon:{fontSize: 22,color: '#404040'},

    errorTextStyle: {fontSize: 20,alignSelf: 'center',color: '#ff0000'},

    tAndCmodal: { width: 300 },

    detailsmodal: { top:150, width: 300 },

    itemStyle: {borderBottomWidth: 1,borderColor: '#fff'},

    bgContainer: { flex:1, width: null, height: null },

    bloodStyle: {flex:1, justifyContent: 'center', alignItems: 'center'},
    
    borderLeft:{ borderBottomLeftRadius: 5, borderTopLeftRadius:5 },

    borderRight:{ borderBottomRightRadius: 5, borderTopRightRadius:5 },

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
    modal: {
      justifyContent: 'center', //justifyContent: "center", "space-between", "flex-end", "space-around", "flex-start"
      alignItems: 'center', //'flex-start', 'flex-end', 'center', 'stretch', 'baseline'
      borderRadius:4,
      height: null,
    },
    listItem: {
        justifyContent: 'space-around', 
        paddingTop: 10, 
        paddingBottom: 10, 
        backgroundColor:'#fff', 
        borderColor: '#ffcccc'
    }
});