import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Block = styled.div`
  width: 1vw;
  height: 1vw;
`;

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawing: props.isDrawing,
      mode: props.mode,
    };
  }
  serialize() {
    this.props.serialize();
  }

  switchMode(mode, toggle) {
    if (toggle) {
      this.setState({ mode });
      this.props.dispatch_mode(mode);
    }
  }
  cmd_clear() {
    this.props.dispatch_cmd('clear');
  }

  render() {
    const { dispatch_cmd, dispatch_mode } = this.props;
    // console.log('func dispatch',dispatch_cmd,dispatch_mode);

    return (
      <div className="menu">
        <Item
          name="Pen"
          checked={this.state.mode === 'Pen'}
          emitAction={this.switchMode.bind(this)}
        />
        <Item
          name="Brush"
          checked={this.state.mode === 'Brush'}
          emitAction={this.switchMode.bind(this)}
        />
        <Item
          name="Eraser"
          checked={this.state.mode === 'Eraser'}
          emitAction={this.switchMode.bind(this)}
        />
        <Item
          name="Clear"
          checked={this.state.mode === ''}
          emitAction={this.cmd_clear.bind(this)}
        />
        <Item
          name="Export"
          checked={this.state.mode === ''}
          emitAction={this.serialize.bind(this)}
        />
      </div>
    );
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      checked: props.checked,
    };
  }

  onClick() {
    let { disabled, checked } = this.state;
    checked = !this.props.checked;
    // this.setState({checked});
    console.log(this.props, checked);
    this.props.emitAction(this.props.name, checked);
  }

  render() {
    const { disabled, checked } = this.state;
    return (
      <div className="menu-item">
        <button
          disabled={disabled}
          checked={this.props.checked}
          onClick={this.onClick.bind(this)}
        >
          {/* <Icon iconName='Edit'/> */}
          {this.props.name}
        </button>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatch_mode: payload => dispatch(menuAction(payload)),
    dispatch_cmd: payload => dispatch(menuCommand(payload)),
    dispatch,
  };
}

const mapStateToProps = (state, ownProps) => ({
  mode: state.get('canvas').get('mode'),
  isDrawing: state.get('canvas').get('isDrawing'),
  ui: state.get('canvas').get('ui'),
});

function menuAction(payload) {
  return {
    type: 'switch-mode',
    payload,
  };
}

function menuCommand(payload) {
  return {
    type: 'ui-command',
    payload,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
