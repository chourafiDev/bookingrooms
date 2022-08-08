import { Modal, Space, Table, Tag } from "antd";
import { useEffect } from "react";
import Layout from "../../../components/admin/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getRooms,
  deleteRoom,
  reset,
} from "../../../redux/features/admin/room/roomSlice";

const Index = () => {
  const dispatch = useDispatch();

  const { rooms, isLoading, isError, message, messageSuccess } = useSelector(
    (state) => state.adminRoom
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (messageSuccess) {
      toast.success(messageSuccess);
    }

    dispatch(getRooms());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, messageSuccess]);

  // ----------------------- Delete room -----------------------
  const { confirm } = Modal;
  function showDeleteConfirm(id) {
    confirm({
      title: "Are you sure to delete this room?",
      okText: `Oui, delete`,
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(deleteRoom(id));
      },
    });
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size) => (
        <>
          <span>{size}m²</span>
        </>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      render: (featured) => (
        <>
          <Tag color={featured === true ? "green" : "volcano"}>
            {featured === true ? "Yes" : "No"}
          </Tag>
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "pricePerNight",
      key: "pricePerNight",
      render: (price) => (
        <>
          <span>${price}</span>
        </>
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
            <Link to={`reviews/${record && record._id}`}>
              <button className="btn btn-success">Reviews</button>
            </Link>
            <Link to={`editRoom/${record && record._id}`}>
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
            <h6 className="text-dark/80 text-xl">All rooms</h6>
            <Link to="newRoom">
              <button className="btn btn-primary"> New room</button>
            </Link>
          </div>
          <div className="">
            {rooms && (
              <Table
                bordered
                childrenColumnName="antdChildren"
                columns={columns}
                dataSource={rooms}
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
