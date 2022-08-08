import { Table, Modal, Space, Avatar } from "antd";
import { useEffect } from "react";
import Layout from "../../../components/admin/Layout";
import { useDispatch, useSelector } from "react-redux";
import Placeholder from "../../../assets/admin/placeholder.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  allUsers,
  deleteUser,
  reset,
} from "../../../redux/features/admin/users/usersSlice";

const Index = () => {
  const dispatch = useDispatch();

  const { users, isError, isLoading, message, messageSuccess } = useSelector(
    (state) => state.adminUser
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (messageSuccess) {
      toast.success(messageSuccess);
    }

    dispatch(allUsers());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, messageSuccess]);

  // ----------------------- Delete User -----------------------
  const { confirm } = Modal;
  function showDeleteConfirm(id) {
    confirm({
      title: "Are you sure to delete this user?",
      okText: `Oui, delete`,
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(deleteUser(id));
      },
    });
  }

  const columns = [
    {
      title: "User",
      render: (record) => (
        <Space>
          <Avatar
            style={{ width: "50px", height: "50px" }}
            src={record && record.photo.url ? record.photo.url : Placeholder}
          />
          <span style={{ marginLeft: "10px" }}>
            {record && record.username}
          </span>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      width: "5%",
      title: "Actions",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <>
          <Space>
            <Link to={`editUser/${record && record._id}`}>
              <button className="btn btn-yellow">Edit</button>
            </Link>
            <button
              onClick={() => {
                showDeleteConfirm(record._id);
              }}
              className="btn btn-danger"
            >
              delete
            </button>
          </Space>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <div className="p-6 bg-blue/5 mt-12 min-h-full">
        <div className="card custome-shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h6 className="text-dark/80 text-xl">All Users</h6>
            <Link to="newUser">
              <button className="btn btn-primary"> New user</button>
            </Link>
          </div>
          <div className="">
            {users && (
              <Table
                bordered
                columns={columns}
                dataSource={users}
                loading={isLoading}
                pagination={{
                  defaultPageSize: 5,
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20", "30"],
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
