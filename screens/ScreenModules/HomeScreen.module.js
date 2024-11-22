import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    marginTop: -350,
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
    marginTop: 30,
  },
  button: {
    backgroundColor: '#f79308',
    padding: 30,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});