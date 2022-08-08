import { Modal, Table } from "antd";
import { useEffect } from "react";
import Layout from "../../../components/admin/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getReviews,
  deleteReview,
  reset,
} from "../../../redux/features/admin/reviews/reviewSlice";
import moment from "moment";

const Index = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const roomId = params.id;

  const { reviews, isLoading, isError, message, messageSuccess } = useSelector(
    (state) => state.adminReview
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (messageSuccess) {
      toast.success(messageSuccess);
    }

    if (roomId) {
      dispatch(getReviews(roomId));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, messageSuccess, roomId]);

  // ----------------------- Delete Review -----------------------
  const { confirm } = Modal;
  function showDeleteConfirm(reviewId) {
    confirm({
      title: "Are you sure to delete this review?",
      okText: `Oui, delete`,
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        const reviewInfo = { roomId, reviewId };
        dispatch(deleteReview(reviewInfo));
      },
    });
  }

  const columns = [
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "User",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (recorde) => (
        <span>{moment(recorde.createdAt).format("LLL")}</span>
      ),
    },

    {
      width: "5%",
      title: "Actions",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <>
          <button
            onClick={() => {
              showDeleteConfirm(record._id);
            }}
            className="btn btn-sm btn-danger "
          >
            delete
          </button>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <div className="p-6 bg-blue/5 mt-12 min-h-full">
        <div className="card custome-shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h6 className="text-dark/80 text-xl">Reviews</h6>
            <Link to="/admin/rooms">
              <button className="btn btn-primary"> Back to rooms</button>
            </Link>
          </div>
          <div className="">
            {reviews.length >= 1 ? (
              <Table
                bordered
                childrenColumnName="antdChildren"
                columns={columns}
                dataSource={reviews}
                loading={isLoading}
                pagination={{
                  defaultPageSize: 5,
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20", "30"],
                }}
              />
            ) : (
              <p className="text-card-header-warning">
                No reviews for this room
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
