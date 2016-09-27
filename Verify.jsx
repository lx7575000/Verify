import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  message,
  Button,
  Modal
} from 'antd';

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalvisible: false,
    };
    this.showModal = this.showModal.bind(this);
    this.handleOK = this.handleOK.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.clickFocus = this.clickFocus.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitTicketCode = this.submitTicketCode.bind(this);
    this.validateTicket = this.validateTicket.bind(this);
  }
  componentDidMount() {
    const self = this;
    ReactDOM.findDOMNode(this._showbtn).addEventListener('click', function(){
      setTimeout(() => {
        self._input.focus();
      }, 100);
    });
  }
  componentWillUnmount() {
    ReactDOM.findDOMNode(this._showbtn).removeEventListener('click', () => {
      // console.log('remove ..');
    });
  }

  showModal() {
    this.setState({
      modalvisible: true,
    });
  }
  handleOK() {
    // console.log('Click OK Button, next step is confirm the code information .');
    this.setState({
      modalvisible: false,
      ticketvalue: '',
    });
    // 清除显示内容
    for (let i = 1; i <= 10; i++) {
      ReactDOM.findDOMNode(this[`_span${i}`]).innerHTML = ' ';
    }
    ReactDOM.findDOMNode(this._input).value = '';
    this._input.disabled = false;
  }

  handleCancel() {
    this.setState({
      modalvisible: false,
      ticketvalue: '',
    });
    for (let i = 1; i <= 10; i++) {
      ReactDOM.findDOMNode(this[`_span${i}`]).innerHTML = ' ';
    }
    // 清楚input中已经输入的内容
    ReactDOM.findDOMNode(this._input).value = '';
    this._input.disabled = false;
  }

  clickFocus() {
    ReactDOM
        .findDOMNode(this._input)
        .focus();
  }
  submitTicketCode() {
    // console.log('当length为10时，自动reqwest数据到后端进行验证....');
    this._input.disabled = true;
    // this.validateFetch({ ticket_no: `wb${this.state.ticketvalue}` });
    this.props.cb({ ticket_no: `wb${this.state.ticketvalue}` });
    this.setState({
      ticketvalue: '',
    });
  }

  validateTicket(e, val) {
    if (/^[0-9]*$/.test(val)) {
      this.setState({
        ticketvalue: val,
      });
      for (let i = 1; i <= 10; i++) {
        if (val[i - 1]) {
          ReactDOM.findDOMNode(this[`_span${i}`]).innerHTML = val[i - 1];
        } else {
          ReactDOM.findDOMNode(this[`_span${i}`]).innerHTML = ' ';
        }
      }
    } else {
      // 将非法输入清除掉
      e.target.value = val.split('').splice(0, val.length - 1).join('');
      // console.log(val);
      message.error('要输入合法兑换码', 3);
    }
  }

  handleInputChange(e) {
    const val = e.target.value;
    if (val.length < 10) {
      this.validateTicket(e, val);
    } else if (Number(val.length) === 10) {
      this.validateTicket(e, val);
      setTimeout(() => {
        this.submitTicketCode();
      }, 1000);
      ReactDOM.findDOMNode(this._input).value = '';
      setTimeout(() => {
        this.handleOK();
        // console.log(this);
      }, 1500);
    }
  }
  // validateFetch(params = {}) {
    // console.log('validateFetch ' + params.ticket_no);
  //   this.setState({ loading: true });
  //   reqwest({
  //     url: '/business/virtual-tickets/checkout',
  //     method: 'post',
  //     data: params,
  //     type: 'json',
  //     withCredentials: true,
  //     success: (result) => {
  //       this.setState({ loading: false });
  //       if (Number(result.code) === 1) {
  //         message.success('校验成功');
  //         this.setState({
  //           ticketvalue: '',
  //         });
  //       } else {
  //         message.error(result.msg);
  //       }
  //     },
  //     error: (err) => {
  //       this.setState({ loading: false });
  //       switch (err.status) {
  //         case 404:
  //           message.error('获取数据失败，请联系官方人员！');
  //           break;
  //         default:
  //           message.error('获取数据失败，请刷新重试！');
  //           break;
  //       }
  //     }
  //   });
  // }

  render() {
    const { title, description, prefix, notice } = this.props;
    return (
      <div>
        <div style={{ height: 30, marginBottom: 20 }}>
          <Button
            type="primary"
            ref={(c) => this._showbtn = c}
            style={{ float: 'right' }}
            onClick={this.showModal}
          >
          校验
          </Button>
        </div>
        <Modal
          title={title} visible={this.state.modalvisible}
          onOk={this.handleOK} onCancel={this.handleCancel}
          ref="modal"
        >
          <div
            style={{ position: 'relative', height: 80 }}
          >
            <p style={{ marginBottom: '5px' }}>{description}:</p>
            <input
              ref={(c) => this._input = c}
              style={{ width: 400, opacity: 0 }}
              onChange={this.handleInputChange}
              value={this.ticketvalue}
            />
            <p className="prefix">
              {prefix}
            </p>
            <div
              className="input"
              style={{ position: 'absolute', top: 35, right: 0 }}
              onClick={this.clickFocus}
            >
              <span ref={(c) => this._span1 = c}>&nbsp;</span>
              <span ref={(c) => this._span2 = c}>&nbsp;</span>
              <span ref={(c) => this._span3 = c}>&nbsp;</span>
              <span ref={(c) => this._span4 = c}>&nbsp;</span>
              <span ref={(c) => this._span5 = c}>&nbsp;</span>
              <span ref={(c) => this._span6 = c}>&nbsp;</span>
              <span ref={(c) => this._span7 = c}>&nbsp;</span>
              <span ref={(c) => this._span8 = c}>&nbsp;</span>
              <span ref={(c) => this._span9 = c}>&nbsp;</span>
              <span ref={(c) => this._span10 = c}>&nbsp;</span>
            </div>
          </div>
          <div>
            <p
              onClick={this.clickFocus}
              style={{ textAlign: 'right', color: 'red', marginTop: 10 }}
            >{notice}</p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Verify;
