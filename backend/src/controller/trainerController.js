import Trainer from "../model/trainer.js";
import Class from "../model/class.js"; // Make sure you import Class model
import Booking from "../model/booking.js"; // Make sure you import Booking model
import User from "../model/user.js";
import Review from "../model/review.js";
import { sendEmail } from "../service/emailService.js";
// Create or Update Trainer Profile
const createTrainerProfile = async (req, res) => {
  try {
    // Extracting userId from `req.user` populated by verifyAuth middleware
    const userId = req.user.id;

    const {
      specializations,
      bio,
      experience,
      certifications,
      profilePictureUrl,
    } = req.body;

    // Use upsert to either update or create the trainer profile in one go
    const trainer = await Trainer.findOneAndUpdate(
      { userId },
      {
        $set: {
          specializations,
          bio,
          experience,
          certifications,
          profilePictureUrl,
        },
      },
      { new: true, upsert: true } // upsert: true creates a new document if it doesn't exist
    );

    const message = trainer
      ? "Trainer profile updated successfully"
      : "Trainer profile created successfully";
    res.status(200).json({ message, trainer });
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const createClass = async (req, res) => {
  try {
    const newClass = await Class.create({
      trainerId: req.user.id, // Assuming user.id is the trainer's userId
      ...req.body,
    });
    res.status(201).json({ message: "Class created successfully", newClass });
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const editClass = async (req, res) => {
  try {
    const updatedClass = await Class.findOneAndUpdate(
      { classId: req.params.classId }, // Using classId to find class
      req.body,
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Send email notification about class update
    const classDetails = `
      Class Name: ${updatedClass.className}
      Class Date: ${updatedClass.timeSlot.day}
      Start Time: ${updatedClass.timeSlot.startTime}
      End Time: ${updatedClass.timeSlot.endTime}
      Class Link: ${updatedClass.classLink}
    `;

    // Assuming you have access to the users who need to be notified (e.g., attendees)
    // You might want to retrieve users based on the updated class attendees
    const attendeesEmails = updatedClass.attendees.map(async (attendeeId) => {
      const user = await User.findOne({ id: attendeeId }); // Find the user by their ID
      return user.email; // Return the user's email
    });

    // Wait for all emails to be retrieved
    const emails = await Promise.all(attendeesEmails);

    // Send email to all attendees about the class update
    await Promise.all(
      emails.map((email) =>
        sendEmail(
          email,
          "Class Rescheduled",
          `The class has been updated:\n\n${classDetails}`
        )
      )
    );

    res.json({ message: "Class updated successfully", updatedClass });
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const viewBookedUsers = async (req, res) => {
  try {
    // Extract classId from request parameters
    const { classId } = req.params;

    // Find all bookings for the specified classId
    const bookings = await Booking.find({ classId });

    // If no bookings are found, return a message
    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No users found for this class." });
    }

    // Create an array to hold user details
    const bookedUsers = [];

    // Loop through each booking to get user details
    for (const booking of bookings) {
      const user = await User.findOne({ id: booking.userId }); // Adjusted to use userId field

      if (user) {
        bookedUsers.push({
          userId: user.userId, // Assuming you want to return the UUID
          name: user.name, // Include any other user details you want to return
          email: user.email,
          bookingStatus: booking.bookingStatus,
          paymentStatus: booking.paymentStatus,
        });
      }
    }

    // Return the array of booked users
    res.json(bookedUsers);
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const cancelClass = async (req, res) => {
  try {
    // Cancel the class by updating the status in the Class model
    const classInstance = await Class.findOneAndUpdate(
      { classId: req.params.classId }, // Use the classId to locate the class
      { status: "canceled" },
      { new: true }
    );

    if (!classInstance) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Retrieve all bookings associated with the classId
    const bookings = await Booking.find({ classId: classInstance.classId });

    // Update booking status and refund status for each booking under this class
    await Booking.updateMany(
      { classId: classInstance.classId },
      { bookingStatus: "canceled", refundStatus: "processed" }
    );

    // Notify each user with an email regarding the cancellation and refund
    for (const booking of bookings) {
      const user = await User.findOne({ id: booking.userId });

      if (user) {
        const userEmail = user.email;
        const className = classInstance.className; // Assuming class has a name field
        await sendEmail(
          userEmail,
          "Class Cancellation Notification",
          `Dear ${user.name}, your booking for the class '${className}' has been canceled by the trainer. A refund has been processed for your booking.`
        );
      }
    }

    res.json({
      message: "Class canceled and refunds processed, notifications sent",
    });
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const viewPostedClasses = async (req, res) => {
  try {
    const trainerId = req.user.id; // Extract trainer ID from the token

    // Find all classes associated with this trainer
    const postedClasses = await Class.find({ trainerId });

    if (postedClasses.length === 0) {
      return res
        .status(404)
        .json({ message: "No classes posted by this trainer." });
    }

    res.json(postedClasses); // Return the array of posted classes
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const filterClasses = async (req, res) => {
  try {
    const { category, date, startTime, endTime, priceRange } = req.query; // Extract filters

    // Build filter criteria
    const filterCriteria = { trainerId: req.user.id };

    if (category) {
      filterCriteria.classType = category; // Filter by category
    }

    if (date) {
      filterCriteria["timeSlot.day"] = date; // Filter by specific day
    }

    if (startTime && endTime) {
      filterCriteria["timeSlot.startTime"] = { $gte: startTime }; // Start time >= specified time
      filterCriteria["timeSlot.endTime"] = { $lte: endTime }; // End time <= specified time
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split(",").map(Number);
      filterCriteria.price = { $gte: minPrice, $lte: maxPrice };
    }

    const filteredClasses = await Class.find(filterCriteria);

    if (filteredClasses.length === 0) {
      return res
        .status(404)
        .json({ message: "No classes found matching the criteria." });
    }

    res.json(filteredClasses);
  } catch (error) {
    console.error(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const searchClassesByName = async (req, res) => {
  try {
    const { name } = req.query; // Extract name from query parameters

    // Find classes where the class name matches the search term
    const searchedClasses = await Class.find({
      trainerId: req.user.id, // Ensure the search is limited to the trainer's classes
      className: { $regex: name, $options: "i" }, // Case-insensitive search
    });

    if (searchedClasses.length === 0) {
      return res
        .status(404)
        .json({ message: "No classes found with the specified name." });
    }

    res.json(searchedClasses); // Return the array of matched classes
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const viewReviewsByClassId = async (req, res) => {
  try {
    const { classId } = req.params; // Extract classId from request parameters

    // Find all reviews associated with the specified classId
    const reviews = await Review.find({ classId }); // Assuming you need to associate reviews with classes

    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this class." });
    }

    res.json(reviews); // Return the array of reviews
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

export default {
  createTrainerProfile,
  createClass,
  editClass,
  viewBookedUsers,
  cancelClass,
  viewPostedClasses,
  filterClasses,
  searchClassesByName,
  viewReviewsByClassId,
};
