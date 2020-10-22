import React from 'react';
import Main from './components/mainComponent';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

export default class App extends React.Component {
  render() {

    const theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        accent: 'yellow',
      },
    };

    return (
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    );
  }
}
