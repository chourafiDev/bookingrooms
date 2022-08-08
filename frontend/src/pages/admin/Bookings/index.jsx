import { Table, Modal, Space } from "antd";
import { useEffect } from "react";
import Layout from "../../../components/admin/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import {
  getBookings,
  deleteBooking,
  reset,
} from "../../../redux/features/admin/bookings/bookingSlice";

const Index = () => {
  const dispatch = useDispatch();

  const { bookings, isError, isLoading, message, messageSuccess } = useSelector(
    (state) => state.adminBooking
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (messageSuccess) {
      toast.success(messageSuccess);
    }

    dispatch(getBookings());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, messageSuccess]);

  // ----------------------- Delete User -----------------------
  const { confirm } = Modal;
  function showDeleteConfirm(id) {
    confirm({
      title: "Are you sure to delete this booking?",
      okText: `Oui, delete`,
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(deleteBooking(id));
      },
    });
  }

  const columns = [
    {
      title: "Room",
      key: "room",
      render: (record) => <span>{record && record.room.title}</span>,
    },
    {
      title: "User",
      key: "user",
      render: (record) => <span>{record && record.user.username}</span>,
    },
    {
      title: "Check In Date",
      dataIndex: "checkInDate",
      key: "checkInDate",
      render: (record) => (
        <span>{record && moment(record.checkInDate).format("L")}</span>
      ),
    },
    {
      title: "Check Out Date",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      render: (record) => (
        <span>{record && moment(record.checkOutDate).format("L")}</span>
      ),
    },
    {
      width: "5%",
      title: "Actions",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <>
          <Space>
            <Link to={`bookingDetails/${record && record._id}`}>
              <button className="btn btn-yellow">Details</button>
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
            <h6 className="text-dark/80 text-xl">All Bookings</h6>
          </div>
          <div className="">
            <Table
              bordered
              columns={columns}
              dataSource={bookings}
              loading={isLoading}
              pagination={{
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "30"],
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
