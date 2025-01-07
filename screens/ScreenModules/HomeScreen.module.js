import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  
  titleImage: {
    width: 180,  // Adjust width to your preference
      height: 119,  // Adjust height proportionally to your image
      marginBottom: 0,
      resizeMode: 'cover',
      marginHorizontal: 32,
    
  },

  menuButtonProfile:{
    width:50,
    height:50,
    backgroundColor: '#fff',
    borderRadius: 50,
  },

  profileImage:{
    width:50,
    height:50,
    borderRadius: 50,
    padding:10,
  },


  menuButton: {
    width:50,
    height:50,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 11,
  },
  menuText: {
    fontSize: 20,
    color: '#000',
  },
  
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: -10,
    flex: 1,
    alignContent: 'center',
  },
  button: {
    width:150,
    height:100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});