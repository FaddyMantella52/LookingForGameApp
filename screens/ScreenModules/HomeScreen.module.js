import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
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
    width: 180, 
    height: 119, 
    marginBottom: 0,
    resizeMode: 'cover',
    marginHorizontal: 15,
  },

  menuButtonProfile: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 10,
  },

  menuButton: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 11,
  },

  menuText: {
    fontSize: 20,
    color: '#000',
  },

  buttonsContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  button: {
    backgroundColor: 'rgba(28, 28, 28, 0.8)',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },


  newsContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },

  newsCard: {
    backgroundColor: 'rgba(28, 28, 28, 0.8)',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },

  newsDescription: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },

    seeAllNews: {
      color: '#ADD8E6', 
      fontSize: 14, 
    },

  newsBoxTitle: {
    color: '#fff', 
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 10,
    textAlign: 'center',
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#FF5733', // A bright color for the button
    borderRadius: 5,
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
