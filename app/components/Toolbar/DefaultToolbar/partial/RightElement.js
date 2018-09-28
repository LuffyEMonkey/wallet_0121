import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../../styles';

const ThemeStyle = {
  white: {
    text: styles.navyText,
  },
  whiteLight: {
    text: styles.purpleText,
  },
  purple: {
    text: styles.whiteText,
  },
};

const createActionArea = (theme, data) => (
  <TouchableOpacity style={styles.actionArea}>
    <Text style={[styles.actionText, ThemeStyle[theme].text]}>{data.actionText}</Text>
  </TouchableOpacity>
);

const RightElement = ({ theme, data }) => (
  <View style={[styles.toolbarElement, styles.rightElement]}>
    { (data && data.actionText) ? createActionArea(theme, data) : null}
  </View>
);

RightElement.propTypes = {
  theme: PropTypes.string.isRequired,
  data: PropTypes.shape({}),
};

RightElement.defaultProps = {
  data: {},
};

export default RightElement;
