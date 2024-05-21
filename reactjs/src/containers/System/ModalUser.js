import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }

  componentDidMount() {}
  toggle = () => {
    this.props.toggleFormParent();
  };
  checkValidInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleAddNewUser = () => {
    let isValid = this.checkValidInput();
    if (isValid === true) {
      this.props.createNewUser(this.state);
    }
  };
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => {
            this.toggle();
          }}
          size="lg"
          className={`modal-user-container`}
          centered
        >
          <ModalHeader
            toggle={() => {
              this.toggle();
            }}
          >
            Create a new user
          </ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container">
                <label>Email</label>
                <input
                  type="text"
                  value={this.state.email}
                  name="email"
                  onChange={(e) => this.handleOnChangeInput(e)}
                />
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  type="password"
                  value={this.state.password}
                  name="password"
                  onChange={(e) => this.handleOnChangeInput(e)}
                />
              </div>
              <div className="input-container">
                <label>FirstName</label>
                <input
                  type="text"
                  value={this.state.firstName}
                  name="firstName"
                  onChange={(e) => this.handleOnChangeInput(e)}
                />
              </div>
              <div className="input-container">
                <label>LastName</label>
                <input
                  type="text"
                  value={this.state.lastName}
                  name="lastName"
                  onChange={(e) => this.handleOnChangeInput(e)}
                />
              </div>
              <div className="input-container max-width-input">
                <label>Address</label>
                <input
                  type="text"
                  value={this.state.address}
                  name="address"
                  onChange={(e) => this.handleOnChangeInput(e)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                this.handleAddNewUser();
              }}
              className="px-3"
            >
              Add new
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                this.toggle();
              }}
              className="px-3"
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
