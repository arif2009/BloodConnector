'use strict';

import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    bgColor: {
        backgroundColor: '#ffcccc'
    },
    hRed:{
        backgroundColor: '#e60000'
    },
    nabBg: {
        backgroundColor: '#ff0000'
    },
    txtColor: {
        color: '#fff'
    },
    txtBlue:{
        color: '#0000ff'
    },
    borderBottom0:{
        borderBottomWidth:0
    },
    selfAlignCenter:{
        alignSelf: 'center'
    },
    footerBg: {
        backgroundColor: '#ff8080',
        justifyContent:'center'
    },
    budgetTxt: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    sceneTitle: {
        alignSelf: 'center',
        color: '#fff'
    },
    txtMedium: {
        fontSize: 16,
		fontWeight: '600'
    },
    txtBolder: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    drawerContainer: {
        flex: 1,
        backgroundColor: '#ffcccc'
    },
    drawerHeader: {
        borderBottomWidth: 1,
        flexDirection: 'column',
        marginTop: 5,
        paddingBottom: 5
    },
    drawerBtnContainer:{
        paddingLeft:15, 
        paddingTop:10, 
        paddingBottom:10
    },
    drawerBtnTxt: {
        fontSize: 18,
        color: '#404040',
    },
    drawerIcon:{
        fontSize: 22,
        color: '#404040'
    },
    errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: '#ff0000'
	}
});