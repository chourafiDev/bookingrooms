import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import {
  getBookings,
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

  const columns = [
    {
      title: "Room",
      key: "room",
      render: (recorde) => <span>{recorde.room.title}</span>,
    },
    {
      title: "check In Date",
      key: "CheckInDate",
      render: (recorde) => (
        <span>{moment(recorde.checkInDate).format("L")}</span>
      ),
    },
    {
      title: "check Out Date",
      key: "CheckOutDate",
      render: (recorde) => (
        <span>{moment(recorde.checkOutDate).format("L")}</span>
      ),
    },
    {
      title: "Amount Paid",
      key: "amountPaid",
      render: (recorde) => <span>{recorde.amountPaid}</span>,
    },
  ];

  return (
    <div className="card custome-shadow-sm w-full my-10">
      <h3 className="mb-2">Recent Bookings</h3>
      <Table columns={columns} dataSource={bookings} loading={isLoading} />
    </div>
  );
};

export default Index;
