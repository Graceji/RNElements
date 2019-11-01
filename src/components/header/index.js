import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, TouchableOpacity, Image } from 'react-native';
import { styleType, nodeType } from '../../utils';
import Children from './_components/children';
import styles from './styles';

export default class RNHeader extends PureComponent {
  static defaultProps = {
    barStyle: 'light-content',
    children: [],
  };

  static propTypes= {
    ViewComponent: PropTypes.element,
    barStyle: styleType,
    statusBarProps: PropTypes.object,
    barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    children: nodeType,
    containerStyle: styleType,
    leftContainerStyle: styleType,
    centerContainerStyle: styleType,
    rightContainerStyle: styleType,
    leftComponent: nodeType,
    centerComponent: nodeType,
    rightComponent: nodeType,
    navigation: PropTypes.object,
    backIconStyle: styleType,
    backIcon: nodeType,
  };

  render () {
    const {
      ViewComponent = View, // 暂时外层container组件定为View
      containerStyle,
      barStyle,
      statusBarProps,
      children,
      leftContainerStyle,
      centerContainerStyle,
      rightContainerStyle,
      leftComponent,
      centerComponent,
      rightComponent,
      backIconStyle,
      navigation,
      backIcon,
      ...attributes
    } = this.props;
    return (
      <ViewComponent
        style={[
          styles.container,
          containerStyle,
        ]}
        {...attributes}
      >
        <StatusBar barStyle={barStyle} {...statusBarProps} />
        <Children
          containerStyle={[{ flex: 1 }, leftContainerStyle]}
          placement="left"
        >
          {
            (children && React.isValidElement(children))
            || children[0]
            || leftComponent
            || (navigation && (
              <TouchableOpacity style={[styles.backIcon, backIconStyle]}
                // onPress={}
              >
                <Image src={require('../../assets/imgs/arrowLeft.png')} style={styles.backIconImg} />
              </TouchableOpacity>
            ))
            || null
          }
        </Children>
        <Children
          containerStyle={[{ flex: 3 }, centerContainerStyle]}
          placement="center"
        >
          {
            (children && React.isValidElement(children))
            || children[1]
            || centerComponent
            || null
          }
        </Children>
        <Children
          containerStyle={[{ flex: 1 }, rightContainerStyle]}
          placement="right"
        >
          {
            (children && React.isValidElement(children))
            || children[2]
            || rightComponent
            || null
          }
        </Children>
      </ViewComponent>
    );
  }
}