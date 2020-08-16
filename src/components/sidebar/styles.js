import {StyleSheet} from 'react-native';

export const SS = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#ffcccc',
  },
  drawerHeader: {
    borderBottomWidth: 1,
    flexDirection: 'column',
    marginTop: 5,
    paddingBottom: 5,
  },
  drawerIcon: {fontSize: 22, color: '#404040'},
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#000',
    borderTopWidth: 1,
  },
});
