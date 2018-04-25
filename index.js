import React from 'react';
import {
  Dimensions,
  View,
} from 'react-native';

export default class LandscapeView extends React.PureComponent {
    constructor(){
      super()
  
      this.state = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }
    }
  
    render(){
        const {
            width,
            height,
        } = this.state

        return (width < height ? this.renderRotated() : this.renderOriginal());
    }

    renderRotated(){
        const {
            angle = 90,
            style,
            uri,
        } = this.props
      
        const {
            width,
            height,
        } = this.state
    
        const anchor = parseInt((Math.max(width, height) - Math.min(width, height)) / 2)
      
        return (
            <View style={[{
              width:'100%',
              height:'100%',
              transform: [
                {rotateZ: `${angle}deg`},
                {translateX: anchor * -1},
                {translateY: anchor}
              ]
            }, style]}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              this.setState({
                width,
                height,
              })
            }}
            >
            <View style={{
              width: height,
              height: width,
            }}>
                {this.props.children}
              
            </View>
        </View>
        )
    }

    renderOriginal(){
        const {
            style,
        } = this.props

        return (
        <View style={[{
            width:'100%',
            height:'100%',
        }, style]}>
        {this.props.children}
        </View>
        )
    }
  }