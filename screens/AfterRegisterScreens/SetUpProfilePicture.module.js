import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  imageContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedImageContainer: {
    borderColor: '#FFD700', // Gold for selection
  },
  imageWrapper: {
    backgroundColor: '#FFFFFF', // White background
    borderRadius: 10,
    overflow: 'hidden',
    padding: 5,
  },
  imageThumbnail: {
    width: 100,
    height: 100,
  },
  placeholderText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonDisabled: {
    backgroundColor: '#A9A9A9',
  },
  buttonEnabled: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;
