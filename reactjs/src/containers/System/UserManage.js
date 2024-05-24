import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createNewUserService,
  deleteUserById,
  editUserService,
  getAllUsers,
} from "../../services/userService";
import { emitter } from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";
import ModalUser from "./ModalUser";
import "./UserManage.scss";
import { toast } from "react-toastify";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    try {
      const response = await getAllUsers("ALL");
      if (response && response.errCode === 0) {
        this.setState({ arrUsers: response.users });
      } else {
        alert(response.errMessage);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  handleAddNewUser = () => {
    this.setState({ isOpenModalUser: true });
  };

  toggleUserModal = () => {
    this.setState((prevState) => ({
      isOpenModalUser: !prevState.isOpenModalUser,
    }));
  };

  toggleUserEditModal = () => {
    this.setState((prevState) => ({
      isOpenModalEditUser: !prevState.isOpenModalEditUser,
    }));
  };

  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  validatePassword = (password) => {
     const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  createNewUser = async (data) => {
    if (!this.validateEmail(data.email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!this.validatePassword(data.password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter"
      );
      return;
    }

    try {
      const response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({ isOpenModalUser: false });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.error("Failed to create user", error);
    }
  };

  handleDeleteUser = async (user) => {
    if (
      !window.confirm(`Are you sure you want to delete user ${user.email}?`)
    ) {
      return;
    }

    try {
      const response = await deleteUserById(user.id);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUsersFromReact();
      }
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  doEditUser = async (user) => {
    try {
      const response = await editUserService(user);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({ isOpenModalEditUser: false });
      }
    } catch (error) {
      console.error("Failed to edit user", error);
    }
  };

  render() {
    const { arrUsers, isOpenModalUser, isOpenModalEditUser, userEdit } =
      this.state;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={isOpenModalUser}
          toggleFormParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {isOpenModalEditUser && (
          <ModalEditUser
            isOpen={isOpenModalEditUser}
            toggleFormParent={this.toggleUserEditModal}
            currentUser={userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={this.handleAddNewUser}
          >
            <i className="fas fa-plus me-1"></i>Add new users
          </button>
        </div>
        <div className="users-table mt-4 mx-1">
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.length > 0 &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
