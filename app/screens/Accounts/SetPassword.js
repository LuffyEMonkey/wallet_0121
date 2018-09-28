import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ToastAndroid,
} from 'react-native';

import styles from '../styles';


import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { NotiPanel } from '../../components/Panel';
import { InputPassword } from '../../components/Input';
import { colors } from '../../resources';
import { Accounts } from '../../resources/strings';

const Strings = Accounts.SetPassword;

const validate = (text) => {
  const regex = /^([a-zA-Z0-9~!@#$%^&*()-_]){8,16}$/;
  const match = text.match(regex);

  if (match) ToastAndroid.show('match', ToastAndroid.SHORT);
  else ToastAndroid.show('not match', ToastAndroid.SHORT);
};

class SetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input1: {
        text: '',
        iconVisible: false,
        notiVisible: false,
        notiText: Strings.HELPER_DEFAULT,
        notiColor: colors.transparent,
      },
      input2: {
        text: '',
        iconVisible: false,
        notiVisible: false,
        notiText: Strings.HELPER_DEFAULT,
        notiColor: colors.transparent,
      },
      buttonActive: false,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onEndEditing = this.onEndEditing.bind(this);
  }

  onChangeText(inputName) {
    const { state } = this;
    const input = state[inputName];
    const { input1, input2 } = state;

    if (input) {
      return (text) => {
        if (text.length > 0) input.iconVisible = true;
        else input.iconVisible = false;

        input.text = text;

        this.setState({
          [inputName]: input,
          buttonActive: (input1.text.length > 0 && input2.text.length > 0),
        });
      };
    }

    return null;
  }

  onFocus(inputName) {
    const { state } = this;
    const input = { ...state[inputName] };

    if (input) {
      return () => {
        if (input.text.length === 0 && input.notiColor === colors.transparent) {
          input.notiColor = colors.textAreaNotiTextGray;
          input.notiText = Strings.HELPER_DEFAULT;
        }

        this.setState({
          [inputName]: input,
        });
      };
    }

    return null;
  }

  onEndEditing(inputName) {
    const { state } = this;
    const input = { ...state[inputName] };
    const { input1, input2 } = state;

    if (input) {
      return () => {
        if (input.text.trim().length === 0) {
          input.notiText = Strings.HELPER_ERROR_NOTEXT;
          input.notiColor = colors.alertTextRed;
        } else {
          const result = validate(input.text);

          if (!result) {
            input.notiText = Strings.HELPER_ERROR_RANGE;
            input.notiColor = colors.alertTextRed;
          } else if (inputName === 'input2' && input1.text !== input2.text) {
            input.notiText = Strings.HELPER_ERROR_NOT_MATCH;
            input.notiColor = colors.alertTextRed;
          } else {
            input.notiText = Strings.HELPER_DEFAULT;
            input.notiColor = colors.textAreaNotiTextGray;
          }
        }

        this.setState({
          [inputName]: input,
        });
      };
    }

    return null;
  }

  render() {
    const { input1, input2, buttonActive } = this.state;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: Strings.TITLE,
            },
            right: {
              actionText: Strings.ACTION_TEXT,
            },
          }}
        />
        <ScrollView contentContainerStyle={styles.alignCenter}>
          <Text style={[styles.layoutHead, styles.headText]}>
            {Strings.HEAD_TEXT}
          </Text>
          <InputPassword
            label={Strings.INPUT1_LABEL}
            placeholder={Strings.PLACEHOLDER}
            isIconVisible={input1.iconVisible}
            onChangeText={this.onChangeText('input1')}
            onFocus={this.onFocus('input1')}
            onEndEditing={this.onEndEditing('input1')}
          />
          <NotiPanel
            texts={[
              input1.notiText,
            ]}
            color={input1.notiColor}
          />
          <InputPassword
            label={Strings.INPUT2_LABEL}
            placeholder={Strings.PLACEHOLDER}
            isIconVisible={input2.iconVisible}
            onChangeText={this.onChangeText('input2')}
            onFocus={this.onFocus('input2')}
            onEndEditing={this.onEndEditing('input2')}
          />
          <NotiPanel
            texts={[
              input2.notiText,
            ]}
            color={input2.notiColor}
          />
          <View style={styles.filler} />
          <NotiPanel
            texts={[
              Strings.WARNING1,
              Strings.WARNING2,
            ]}
          />
          <BottomButton
            actions={[
              {
                text: Strings.BOTTOM_BUTTON,
                action: { type: 'NONE' },
              },
            ]}
            inactive={!buttonActive}
          />
        </ScrollView>
      </View>
    );
  }
}

SetPassword.navigationOptions = {
  header: null,
};

export default SetPassword;
