import User from "../model/user.js";
import Class from "../model/class.js";
import Booking from "../model/booking.js";
import Payment from "../model/payment.js";

// Admin Controller for Viewing Users by Role
const viewAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const viewAllTrainers = async (req, res) => {
  try {
    const trainers = await User.find({ role: "trainer" });
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Controller for Deleting a User
const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ id: req.params.userId });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Controller for Transaction Analysis
const viewTransactionTotal = async (req, res) => {
  try {
    const { filter } = req.query; // e.g., "today", "lastWeek"

    let startDate;
    switch (filter) {
      case "today":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        break;
      case "lastWeek":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      default:
        startDate = new Date(0); // all-time
    }

    const transactions = await Payment.find({ createdAt: { $gte: startDate } });
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

    res.json({ totalTransactions: transactions.length, totalAmount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Controller for Viewing Activity Logs
const viewActivityLogs = async (req, res) => {
  try {
    // Find recent bookings
    const recentBookings = await Booking.find()
      .sort({ bookingDate: -1 })
      .limit(10);

    // Find recent cancellations
    const recentCancellations = await Booking.find({
      bookingStatus: "canceled",
    })
      .sort({ bookingDate: -1 })
      .limit(10);

    // Fetch user details for recent bookings
    const bookingsWithUserDetails = await Promise.all(
      recentBookings.map(async (booking) => {
        const user = await User.findOne({ id: booking.userId }); // Find user by UUID
        return {
          bookingId: booking._id,
          user: user ? { id: user.id, name: user.name } : null, // Include user details
          classId: booking.classId,
          bookingStatus: booking.bookingStatus,
          paymentStatus: booking.paymentStatus,
          classDate: booking.classDate,
          bookingDate: booking.bookingDate,
        };
      })
    );

    // Fetch user details for recent cancellations
    const cancellationsWithUserDetails = await Promise.all(
      recentCancellations.map(async (cancellation) => {
        const user = await User.findOne({ id: cancellation.userId }); // Find user by UUID
        return {
          bookingId: cancellation._id,
          user: user ? { id: user.id, name: user.name } : null, // Include user details
          classId: cancellation.classId,
          cancellationReason: cancellation.cancellationReason,
          bookingDate: cancellation.bookingDate,
        };
      })
    );

    res.json({
      recentBookings: bookingsWithUserDetails,
      recentCancellations: cancellationsWithUserDetails,
    });
  } catch (error) {
    console.error(`Error fetching activity logs: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// Admin Controller for Class Insights
const viewClassManagementInsights = async (req, res) => {
  try {
    // Fetch all classes
    const classes = await Class.find();

    const insights = await Promise.all(
      classes.map(async (classItem) => {
        // Fetch bookings for the current class
        const bookings = await Booking.find({ classId: classItem.classId });

        // Calculate booking counts based on statuses
        const confirmedCount = bookings.filter(
          (b) => b.bookingStatus === "confirmed"
        ).length;
        const canceledCount = bookings.filter(
          (b) => b.bookingStatus === "canceled"
        ).length;
        const completedCount = bookings.filter(
          (b) => b.bookingStatus === "completed"
        ).length;

        const capacityUtilization =
          (confirmedCount / classItem.capacity) * 100 || 0; // Prevent NaN if confirmedCount is 0

        return {
          classId: classItem.classId,
          className: classItem.className,
          capacityUtilization: `${capacityUtilization.toFixed(2)}%`,
          totalBookings: bookings.length,
          confirmedBookings: confirmedCount,
          canceledBookings: canceledCount,
          completedBookings: completedCount,
          remainingCapacity: classItem.capacity - confirmedCount, // Calculate remaining based on confirmed bookings
        };
      })
    );

    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Controller for Summary Reports
const generateSummaryReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const payments = await Payment.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    const userRegistrations = await User.countDocuments({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    const classBookings = await Booking.countDocuments({
      bookingDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    res.json({ totalRevenue, userRegistrations, classBookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  viewAllUsers,
  viewAllTrainers,
  deleteUser,
  viewTransactionTotal,
  viewActivityLogs,
  viewClassManagementInsights,
  generateSummaryReport,
};
