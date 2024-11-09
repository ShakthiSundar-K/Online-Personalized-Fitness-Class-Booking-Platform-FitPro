# Project Overview

FitPro is designed to provide a seamless experience for both fitness enthusiasts and trainers. Users can browse, book, and track fitness classes, while trainers can create and manage personalized fitness programs. FitPro also features a review system, payment gateway integration, and real-time notifications.



## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation and Setup](#installation-and-setup)
4. [Project Structure](#project-structure)
5. [Environment Variables](#environment-variables)
6. [Database Models](#Database-Models)
7. [Postman Documentation](#postman-documentation)
8. [Deployment](#deployment)
9. [License](#license)


    
## 1.Features

1.**User Registration and Authentication:** Users can sign up, log in, and manage their profiles.
2.**Email Recovery feature:** In case the user forgets his/her password then it can se reset easily
3.**Trainer Registration and Management:** Trainers can register, create, and manage classes, update their profiles, and track earnings.
4.**Class Booking:** Users can browse classes by trainer, book them based on availability, and cancel bookings if necessary.
5.**Payment Gateway:** Payment Integration with Paypal.
6.**Ratings and Reviews:** Users can leave reviews and ratings for classes, helping others make informed decisions.
7.**Notifications:** Real-time notifications for class confirmations, cancellations, and reminders through email.
8.**Feedback and Review System:** Users can leave feedback on classes.
9.**Responsive Design:** Optimized for all devices with a user-friendly experience on desktop and mobile.



## 2.Tech Stack

### **Frontend**
- **React**: A JavaScript library for building user interfaces.
  - **Dependencies**:
    - `react-dom` (`^18.3.1`): Provides DOM-specific methods for React.
    - `react-hot-toast` (`^2.4.1`): For displaying notifications.
    - `react-icons` (`^5.3.0`): For using icon sets in the React application.
    - `react-router-dom` (`^6.27.0`): Enables navigation and routing within the React app.

- **UI Framework**:
  - **TailwindCSS**: Utility-first CSS framework for custom designs.
    - **Dependencies**:
      - `@material-tailwind/react` (`^2.1.10`): Provides Material Design components.
      - `@tailwindcss/forms` (`^0.5.9`): A plugin to style form elements.

- **Data Fetching**:
  - **Axios** (`^1.7.7`): For making HTTP requests to the backend.



### **Backend**
- **Node.js**: A JavaScript runtime for building server-side applications.
  - **Express.js** (`^4.21.1`): Web framework for Node.js to create RESTful APIs.

- **Database**:
  - **MongoDB**: NoSQL database for storing application data.
    - **Dependencies**:
      - `mongoose` (`^8.7.3`): ODM (Object Data Modeling) library for MongoDB and Node.js.

- **Authentication & Security**:
  - **JWT** (`jsonwebtoken` - `^9.0.2`): For secure token-based authentication.
  - **bcryptjs** (`^2.4.3`): For hashing passwords before storing them securely.

- **Environment Management**:
  - **dotenv** (`^16.4.5`): For loading environment variables from a `.env` file.

- **Payment Integration**:
  - **PayPal SDK** (`paypal-rest-sdk` - `^1.8.1`): For integrating PayPal payment processing.
  - **Optional**: Stripe or Razorpay can be used as alternative payment gateways.

- **Email Service**:
  - **Nodemailer** (`^6.9.16`): For sending transactional emails.

- **File Handling**:
  - **Multer**: For handling file and image uploads.



### **Utilities**
- **UUID** (`uuid` - `^11.0.2`): For generating unique IDs.



### **Development Tools**
- **Nodemon** (`^3.1.7`): For automatically restarting the server during development.
- **Crypto** (`^1.0.1`): For cryptographic functions (optional and could be native to Node.js).



### **Deployment**
- **Frontend**: Deployed on **Netlify**
- **Backend**: Hosted on **Render**, providing backend support with a robust environment.

 

## 3. Installation and Setup

### Prerequisites
- **Node.js**: v16 or later
- **MongoDB**: Cloud or local instance
- **NPM or Yarn**: Package manager for Node.js

### Clone the Repository
```bash
git clone https://github.com/yourusername/fitpro
cd fitpro
```

### Install Dependencies
For both `frontend` and `backend`:
```bash
cd frontend
npm install
cd ../backend
npm install
```

### Environment Variables

Create `.env` files in both `frontend` and `backend` directories as per the [Environment Variables](#environment-variables) section.

### Run the Application
- **Frontend**: `npm start` in the `frontend` directory.
- **Backend**: `npm start` in the `backend` directory.



## 4. Project Structure

The basic structure of the `fitpro` repository is organized as follows:

```
backend/
├── src/
│   ├── controllers/             # Logic for API endpoints (auth, classes, trainers, etc.)
│   ├── middlewares/             # Middleware functions for auth, validation, etc.
│   ├── models/                  # Mongoose schemas for database collections
│   ├── routes/                  # Express routes for API endpoints
│   ├── uploads/                 # Folder for storing uploaded files (images)
│   ├── utils/                   # Utility functions (helpers, validations)
│   ├── server.js                # Main server file
├── .env                         # Environment variables
└── package.json                 # Backend dependencies
```

```
frontend/
├── public/                      # Static files (favicon, index.html, etc.)
├── src/
│   ├── assets/                  # Images and other assets
│   ├── components/              # Reusable UI components (NavBar, ClassCard, etc.)
│   ├── pages/                   # React pages (Home, Profile, ClassList)
│   ├── hooks/                   # Custom React hooks
│   ├── styles/                  # TailwindCSS configurations
│   ├── utils/                   # Helper functions (API calls, date formatting)
│   ├── App.js                   # Main component rendering the application
│   └── main.jsx                 # Entry point of the React app
└── .env                         # Frontend environment variables

```



## 5. Environment Variables

### Backend `.env`:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `STRIPE_SECRET_KEY`: Stripe API secret for payments
- `EMAIL_HOST`: SMTP host for Nodemailer
- `EMAIL_USER`: SMTP user for sending emails
- `EMAIL_PASS`: SMTP password for sending emails
- `CORS_ORIGIN`: Frontend URL for CORS configuration

### Frontend `.env`:
- `REACT_APP_API_URL`: URL for the backend API
- `REACT_APP_STRIPE_PUBLIC_KEY`: Stripe public key for payments



## 6.Database Models

The project utilizes **MongoDB** for data storage, with Mongoose being used for defining and interacting with various database models. Below are the key models used in the application:

### 1. **User Model**

- **Purpose**: Stores information about users, including their name, email, mobile number, preferences, and goals.
- **Fields**:
  - `name`: The name of the user.
  - `id`: A unique identifier for the user (generated automatically).
  - `email`: The user's email address (validated).
  - `profilepic`: The URL to the user's profile picture.
  - `password`: The user's hashed password.
  - `role`: The role of the user (either `user`, `trainer`, or `admin`).
  - `mobile`: The user's mobile number (validated).
  - `preferences`: A list of fitness preferences (e.g., "yoga", "strength").
  - `goals`: A list of fitness goals (e.g., "weight loss", "muscle gain").
  - `availability`: The times when the user is available (morning, afternoon, evening).
  - `bookings`: A reference to the bookings associated with the user.

### 2. **Trainer Model**

- **Purpose**: Stores information about trainers, including their bio, specializations, and rating.
- **Fields**:
  - `userId`: A reference to the user associated with the trainer.
  - `trainerName`: The name of the trainer.
  - `trainerEmail`: The trainer's email address.
  - `specializations`: A list of specializations the trainer holds (e.g., yoga, strength).
  - `bio`: A short biography of the trainer.
  - `experience`: The number of years of experience the trainer has.
  - `certifications`: A list of certifications the trainer holds.
  - `profilePictureUrl`: The URL of the trainer’s profile picture.
  - `rating`: An object containing `averageRating` and `totalReviews` to track user reviews.
  - `availability`: An array defining the trainer's availability (with days and time slots).
  - `totalEarnings`: Total earnings from the trainer’s classes.
  - `canceledUserIds`: An array of user IDs who have canceled their sessions with the trainer.

### 3. **Class Model**

- **Purpose**: Represents fitness classes offered by trainers.
- **Fields**:
  - `trainerId`: A reference to the trainer conducting the class.
  - `classId`: A unique identifier for the class (generated automatically).
  - `classType`: The type of class (e.g., yoga, strength).
  - `className`: The name of the class.
  - `duration`: The duration of the class in minutes.
  - `timeSlot`: An object containing the day, start time, and end time for the class.
  - `classPic`: The URL to the class's image.
  - `capacity`: The maximum number of attendees for the class.
  - `price`: The price of the class.
  - `bookedCount`: The number of bookings for the class.
  - `classLink`: A URL link to the class.
  - `attendees`: A list of user IDs who have booked the class.
  - `status`: The current status of the class (e.g., `available`, `canceled`, `completed`).

### 4. **Booking Model**

- **Purpose**: Stores details about class bookings by users.
- **Fields**:
  - `userId`: A reference to the user making the booking.
  - `classId`: A reference to the class being booked.
  - `bookingStatus`: The status of the booking (e.g., `confirmed`, `canceled`).
  - `paymentStatus`: The payment status (e.g., `paid`, `unpaid`).
  - `refundStatus`: The refund status (e.g., `none`, `requested`).
  - `cancellationReason`: The reason for class cancellation (if applicable).
  - `bookingDate`: The date the booking was made.
  - `classDate`: The date of the class.
  - `classStatus`: The status of the class (e.g., `upcoming`, `completed`, `canceled`).

### 5. **Payment Model**

- **Purpose**: Stores information about payments for bookings.
- **Fields**:
  - `userId`: A reference to the user making the payment.
  - `bookingId`: A reference to the booking for which the payment was made.
  - `amount`: The amount paid.
  - `paymentMethod`: The payment method used (e.g., card, wallet).
  - `paymentStatus`: The status of the payment (e.g., `success`, `failed`).
  - `transactionId`: The unique transaction ID (e.g., from Razorpay).
  - `orderId`: The order ID associated with the payment.

### 6. **Review Model**

- **Purpose**: Stores reviews and ratings for trainers and classes.
- **Fields**:
  - `userId`: A reference to the user leaving the review.
  - `trainerId`: A reference to the trainer being reviewed.
  - `classId`: A reference to the class being reviewed.
  - `rating`: The rating given to the class or trainer.
  - `reviewText`: The text content of the review.

### 7. **MongoDB Connection**

- **Purpose**: Establishes the connection to the MongoDB database.
- **Code**: The connection is established via Mongoose, ensuring that the application communicates with the correct MongoDB instance.

### Database Schema Design

The application uses a **relational** approach to link data between collections. Some key relationships include:
- **Users** can book **Classes**.
- **Trainers** offer **Classes** and receive **Reviews**.
- **Bookings** are linked to **Payments**.
- **Reviews** are provided by **Users** for **Trainers** and **Classes**.

Each of the models is designed to support the primary functionality of the application, such as user management, class scheduling, bookings, payments, and reviews.



## Postman Documentation



## 8. Deployment

### Frontend Deployment on Vercel
1. Link the GitHub repository to Netlify.
2. Add frontend environment variables in Netlify.
3. Deploy the frontend by pushing changes to the main branch.

### Backend Deployment on Render
1. Create a new web service on Render, linking the GitHub repository.
2. Add backend environment variables in Render.
3. Deploy by pushing changes to the main branch.



## 9. License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

