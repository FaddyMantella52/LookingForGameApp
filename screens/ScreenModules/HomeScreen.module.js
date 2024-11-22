import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  
  
  container: {
    flex: 1,
    backgroundColor: '#330000',
    padding: 20,
  },
  
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  titleImage: {
    width: 180,  // Adjust width to your preference
    height: 119,  // Adjust height proportionally to your image
    marginBottom: 0,
    resizeMode: 'cover',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  menuButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
  },
  menuText: {
    fontSize: 20,
    color: '#000',
  },
  questionText: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 20,
  },
  buttonsContainer: {
    marginTop: 30,
  },
  button: {
    backgroundColor: '#f79308',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    width: 150,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});