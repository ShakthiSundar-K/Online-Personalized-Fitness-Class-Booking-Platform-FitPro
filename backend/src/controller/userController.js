import User from "../model/user.js";
import Class from "../model/class.js";
import Booking from "../model/booking.js";
import Trainer from "../model/trainer.js";
import Review from "../model/review.js";
import Payment from "../model/payment.js";
import { sendEmail } from "../service/emailService.js";

const getUserInfoById = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log("User ID from token:", userId);

    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUserInfoById:", error);
    res.status(400).json({ message: error.message });
  }
};

const editUserProfile = async (req, res) => {
  try {
    const { id } = req.user; // UUID
    // console.log("User ID from token:", id);
    const user = await User.findOneAndUpdate({ id: id }, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    await User.findOneAndDelete(req.user.id);
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const viewAllClasses = async (req, res) => {
  try {
    // Fetch all classes that are currently available
    const classes = await Class.find({ status: "available" }); // Assuming 'available' is the status for booking

    if (classes.length === 0) {
      return res.status(404).json({ message: "No available classes found" });
    }

    res.json(classes); // Return the list of available classes
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bookClass = async (req, res) => {
  try {
    const { classId } = req.params; // Get classId from params

    // Find the class using findOne with classId
    const selectedClass = await Class.findOne({ classId });

    // Check if the class exists and its status is available
    if (!selectedClass || selectedClass.status !== "available") {
      return res
        .status(400)
        .json({ message: "Class not available for booking" });
    }

    // Check if the user has already booked the class
    const existingBooking = await Booking.findOne({
      classId,
      userId: req.user.id,
      bookingStatus: "confirmed",
    });
    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "You have already booked this class" });
    }

    // Find all confirmed bookings for the class
    const confirmedBookingsCount = await Booking.countDocuments({
      classId,
      bookingStatus: "confirmed",
    });

    // Check if the class has reached its capacity
    if (confirmedBookingsCount >= selectedClass.capacity) {
      return res.status(400).json({ message: "Class capacity full" });
    }

    // Create a booking
    const booking = await Booking.create({
      userId: req.user.id,
      classId,
      bookingStatus: "confirmed",
      paymentStatus: "paid",
      bookingDate: new Date(),
      classDate: selectedClass.timeSlot.day,
    });

    // Increment the booked count and add user to attendees in the Class model
    await Class.updateOne(
      { classId },
      { $inc: { bookedCount: 1 }, $push: { attendees: req.user.id } }
    );

    // Push classId to the user's bookings array
    await User.updateOne({ id: req.user.id }, { $push: { bookings: classId } });

    // Retrieve email from user object
    const userEmail = req.user.email;
    const classDetails = `
      Class Name: ${selectedClass.className}
      Class Date: ${selectedClass.timeSlot.day}
      Start Time: ${selectedClass.timeSlot.startTime}
      End Time: ${selectedClass.timeSlot.endTime} 
      Class Link: ${selectedClass.classLink} 
    `;
    await sendEmail(
      userEmail,
      "Class Booked",
      `You have successfully booked the class.\n\n${classDetails}`
    );

    res.status(201).json({ message: "Class booked successfully", booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const viewBookedClasses = async (req, res) => {
  try {
    // Extract userId from the token
    const userId = req.user.id;

    // Find all bookings associated with the user
    const userBookings = await Booking.find({ userId });

    // Create an array to hold booked class details
    const bookedClasses = [];

    // Loop through each booking and find the associated class
    for (const booking of userBookings) {
      const selectedClass = await Class.findOne({ classId: booking.classId });

      if (selectedClass) {
        bookedClasses.push({
          bookingId: booking._id,
          classId: selectedClass.classId,
          className: selectedClass.className,
          classType: selectedClass.classType,
          duration: selectedClass.duration,
          timeSlot: selectedClass.timeSlot,
          capacity: selectedClass.capacity,
          price: selectedClass.price,
          bookedCount: selectedClass.bookedCount,
          classLink: selectedClass.classLink,
          classPic: selectedClass.classPic,
          status: booking.bookingStatus,
          classDate: booking.classDate,
          paymentStatus: booking.paymentStatus,
        });
      }
    }

    // Separate upcoming and history classes, excluding canceled classes from upcoming
    const now = new Date();
    const upcoming = bookedClasses.filter(
      (b) => new Date(b.classDate) > now && b.status !== "canceled"
    );

    const history = bookedClasses.filter(
      (b) => new Date(b.classDate) <= now || b.status === "canceled"
    );

    // Gather booked class IDs to exclude from recommendations
    const bookedClassIds = bookedClasses.map((b) => b.classId);

    // Fetch the user's preferences and goals
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const preferredTypes = user.preferences || [];
    const goalTypes = user.goals || [];

    // Find recommended classes based on preferences and goals, excluding booked classes
    const recommendedClasses = await Class.find({
      classId: { $nin: bookedClassIds }, // Exclude already booked classes
      $or: [
        { classType: { $in: preferredTypes } },
        { classType: { $in: goalTypes } },
      ],
    }).select("-createdAt -updatedAt -__v");

    // Return response with upcoming, history, and recommended classes
    res.json({ upcoming, history, recommended: recommendedClasses });
  } catch (error) {
    console.error("Error in viewBookedClasses:", error);
    res.status(400).json({ message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    // Get classId from params and userId from req.user
    const { classId } = req.params;
    const userId = req.user.id;

    // Find the booking based on classId and userId
    const booking = await Booking.findOne({ classId, userId });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const timeDifference = new Date(booking.classDate) - new Date();
    if (timeDifference < 4 * 60 * 60 * 1000) {
      return res
        .status(400)
        .json({ message: "Cannot cancel within 4 hours of class start time" });
    }

    // Retrieve class details using classId from the booking
    const selectedClass = await Class.findOne({ classId });

    // Ensure the class exists to avoid undefined errors
    if (!selectedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Update booking status and refund status
    booking.bookingStatus = "canceled";
    booking.refundStatus = "processed";
    await booking.save();

    // Create a refund
    await Payment.create({
      userId: booking.userId,
      bookingId: booking._id,
      amount: selectedClass.price,
      paymentStatus: "success",
      transactionId: `refund-${booking._id}`,
    });

    // Remove the user from the attendees array in the class model
    await Class.updateOne({ classId }, { $pull: { attendees: userId } });

    // Pull classId from the user's bookings array
    await User.updateOne({ id: userId }, { $pull: { bookings: classId } });

    // Send email notification about cancellation
    const userEmail = req.user.email;
    await sendEmail(
      userEmail,
      "Class Cancellation",
      `You have successfully canceled your booking for class: ${selectedClass.className}. Your refund will be processed shortly.`
    );

    res.json({ message: "Booking canceled and refund processed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const searchClassesByName = async (req, res) => {
  try {
    const { term } = req.query; // Using 'term' as the query parameter for flexibility

    if (!term) {
      return res.status(400).json({ message: "Search term is required" });
    }

    // Perform case-insensitive search by class name or class type (category)
    const classes = await Class.find({
      $or: [
        { className: { $regex: new RegExp(term, "i") } },
        { classType: { $regex: new RegExp(term, "i") } },
      ],
    });

    if (classes.length === 0) {
      return res
        .status(404)
        .json({ message: "No classes found matching the search term." });
    }

    res.status(200).json(classes);
  } catch (error) {
    console.error(`Error in searchClassesByNameOrCategory: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const filterClasses = async (req, res) => {
  try {
    const { date, startTime, endTime, minPrice, maxPrice } = req.query; // Extract filter parameters
    const filterCriteria = {};

    // Filter by specific date
    if (date) {
      filterCriteria["timeSlot.day"] = date; // Assuming `timeSlot.day` holds the date as a string in the schema
    }

    // Filter by time range within the specified date
    if (startTime) {
      filterCriteria["timeSlot.startTime"] = { $gte: startTime };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      filterCriteria.price = {};
      if (minPrice) filterCriteria.price.$gte = Number(minPrice);
      if (maxPrice) filterCriteria.price.$lte = Number(maxPrice);
    }

    // Retrieve filtered classes
    const filteredClasses = await Class.find(filterCriteria);

    if (filteredClasses.length === 0) {
      return res
        .status(404)
        .json({ message: "No classes found matching the filter criteria" });
    }

    res.json(filteredClasses);
  } catch (error) {
    console.error(`Error in ${req.originalUrl}:`, error.message);
    res.status(500).json({ message: error.message });
  }
};

const submitFeedback = async (req, res) => {
  try {
    const { classId } = req.params; // Get classId from request parameters
    const { rating, reviewText } = req.body;

    // Find the class to get trainerId
    const classInstance = await Class.findOne({ classId });
    if (!classInstance) {
      return res.status(404).json({ message: "Class not found" });
    }

    const trainerId = classInstance.trainerId; // Get trainerId from class

    // Create the review
    const review = await Review.create({
      userId: req.user.id,
      trainerId,
      classId, // Add classId to the review
      rating,
      reviewText,
    });

    // Retrieve trainer to update their rating information
    const trainer = await Trainer.findOne({ userId: trainerId });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    // Calculate the new average rating
    const updatedTotalReviews = trainer.rating.totalReviews + 1;
    const updatedAverageRating =
      (trainer.rating.averageRating + rating) / updatedTotalReviews;

    // Update the trainer's rating
    trainer.rating.averageRating = updatedAverageRating;
    trainer.rating.totalReviews = updatedTotalReviews;
    await trainer.save();

    res.status(201).json({ message: "Review submitted successfully", review });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const viewAllTrainers = async (req, res) => {
  try {
    // Populate the 'userId' field from the 'User' model's 'id' field
    const trainers = await Trainer.find({}).populate({
      path: "userId", // Path to populate
      model: "users", // Model to use for population
      select: "name", // Only select the 'name' field
      localField: "userId", // Field in Trainer model
      foreignField: "id", // Field in User model
    });

    res.json(trainers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const viewTrainerById = async (req, res) => {
  try {
    // Step 1: Find the trainer using userId and populate user details
    const trainer = await Trainer.findOne({
      userId: req.params.userId,
    }).populate({
      path: "userId", // Populate `userId` field from the User model
      model: "users", // Ensure "users" matches the actual model name
      select: "name id email", // Select the fields you want from the User model
      localField: "userId", // Local field in Trainer model
      foreignField: "id", // Corresponding field in User model
    });

    // Check if trainer exists
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    // Step 2: Use trainerId to find all associated classes
    const classes = await Class.find({ trainerId: req.params.userId }).select(
      "classType className duration timeSlot  price bookedCount classId classPic"
    );

    // Step 3: Combine trainer and classes data into a single response
    const response = {
      trainer: {
        trainerName: trainer.trainerName,
        specializations: trainer.specializations,
        bio: trainer.bio,
        experience: trainer.experience,
        certifications: trainer.certifications,
        rating: trainer.rating,
        availability: trainer.availability,
        profilePic: trainer.profilePictureUrl,
        userDetails: trainer.userId, // This will include name, id, email from User
      },
      classes, // Array of classes associated with the trainer
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching trainer and classes:", error);
    res.status(400).json({ message: error.message });
  }
};

const searchTrainerByName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: "Search term is required." });
  }

  try {
    // Step 1: Find the user with the provided name and trainer role
    const user = await User.findOne({
      name: new RegExp(name, "i"),
      role: "trainer",
    });

    if (!user) {
      // Return an empty array if no user is found
      return res.json([]);
    }

    // Step 2: Use the user's id to find the trainer details with populated user information
    const trainer = await Trainer.findOne({ userId: user.id }).populate({
      path: "userId", // Field in Trainer model to populate
      model: "users", // Name of the model to use for population (User model)
      select: "name id", // Only select the fields 'name' and 'id' from the User model
      localField: "userId", // Local field in Trainer model
      foreignField: "id", // Field in User model that corresponds to `userId` in Trainer
    });

    if (!trainer) {
      // Return an empty array if no trainer details are found
      return res.json([]);
    }

    // Send the trainer details as an array
    res.json([trainer]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error occurred while searching for trainer." });
  }
};

const filterTrainers = async (req, res) => {
  try {
    const {
      minRating,
      maxRating,
      minExperience,
      maxExperience,
      specializations,
    } = req.query;
    const filterCriteria = {};

    // Filter by rating range
    if (minRating || maxRating) {
      filterCriteria["rating.averageRating"] = {};
      if (minRating)
        filterCriteria["rating.averageRating"].$gte = Number(minRating);
      if (maxRating)
        filterCriteria["rating.averageRating"].$lte = Number(maxRating);
    }

    // Filter by experience range
    if (minExperience || maxExperience) {
      filterCriteria.experience = {};
      if (minExperience) filterCriteria.experience.$gte = Number(minExperience);
      if (maxExperience) filterCriteria.experience.$lte = Number(maxExperience);
    }

    // Filter by specializations (array contains any of the specified values)
    if (specializations) {
      const specializationArray = specializations
        .split(",")
        .map((spec) => new RegExp(spec.trim(), "i"));
      filterCriteria.specializations = { $in: specializationArray };
    }

    // Find trainers with filter criteria and populate the `userId` field to get `name` and `id`
    const trainers = await Trainer.find(filterCriteria).populate({
      path: "userId", // Field in Trainer model
      model: "users", // User model name as registered in Mongoose
      select: "name id", // Select only `name` and `id` fields from User model
      localField: "userId", // Local field in Trainer model
      foreignField: "id", // Corresponding field in User model
    });

    if (trainers.length === 0) {
      return res
        .status(404)
        .json({ message: "No trainers found matching the filter criteria." });
    }

    res.status(200).json(trainers);
  } catch (error) {
    console.error(`Error in filterTrainers: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  editUserProfile,
  deleteUserAccount,
  bookClass,
  viewBookedClasses,
  cancelBooking,
  submitFeedback,
  viewAllTrainers,
  viewTrainerById,
  searchClassesByName,
  filterClasses,
  viewAllClasses,
  filterTrainers,
  searchTrainerByName,
  getUserInfoById,
};
