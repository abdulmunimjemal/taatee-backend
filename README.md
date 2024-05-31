# API Documentation

## Auth Controller
**Base URL**: `/auth`

### 1. Sign Up
- **Endpoint**: `POST /auth/signup`
- **Description**: Registers a new user.
- **Request Body**: `SignupDto`
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password.
  - `firstName` (string, required): User's first name.
  - `lastName` (string, required): User's last name.
  - `role` (Role, optional): User's role.
- **Response**: Returns registration details.

### 2. Sign In
- **Endpoint**: `POST /auth/signin`
- **Description**: Authenticates a user and returns a token.
- **Request Body**: `SigninDto`
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password.
- **Response**: Returns authentication token and user details.

### 3. Validate Token
- **Endpoint**: `POST /auth/validate`
- **Description**: Validates an authentication token.
- **Request Body**: `{ "token": "user's token" }`
- **Response**: Returns validation status and user details if valid.

## Booking Controller
**Base URL**: `/booking`

### 1. Get All Bookings
- **Endpoint**: `GET /booking`
- **Description**: Retrieves all bookings. Access restricted to admin roles.
- **Response**: Array of `Booking`.

### 2. Get Booking by ID
- **Endpoint**: `GET /booking/:id`
- **Description**: Retrieves a specific booking by ID.
- **Request Parameters**: `id` (number, required): Booking ID.
- **Response**: Returns details of the specified booking.

### 3. Delete Booking
- **Endpoint**: `DELETE /booking/:id`
- **Description**: Deletes a specific booking. Verification required.
- **Request Parameters**: `id` (number, required): Booking ID.
- **Response**: Confirmation of deletion.

## Event Controller
**Base URL**: `/event`

### 1. Get All Events
- **Endpoint**: `GET /event`
- **Description**: Retrieves all events.
- **Response**: Array of event details.

### 2. Get Event by ID
- **Endpoint**: `GET /event/:id`
- **Description**: Retrieves specific event details.
- **Request Parameters**: `id` (number, required): Event ID.
- **Response**: Event details.

### 3. Create Event
- **Endpoint**: `POST /event`
- **Description**: Creates a new event. Admin only.
- **Request Body**: `EventDto`
  - `eventName` (string, required)
  - `eventDate` (Date, required)
  - `description` (string, required)
  - `location` (string, required)
  - `isCanceled` (boolean, optional)
  - `maxBooking` (number, optional)
- **Response**: Details of the created event.

### 4. Update Event
- **Endpoint**: `PATCH /event/:id`
- **Description**: Updates an existing event. Admin only.
- **Request Parameters**: `id` (number, required): Event ID.
- **Request Body**: `UpdateEventDto`
- **Response**: Updated event details.

### 5. Delete Event
- **Endpoint**: `DELETE /event/:id`
- **Description**: Deletes a specific event. Admin only.
- **Request Parameters**: `id` (number, required): Event ID.
- **Response**: Confirmation of deletion.

## User Controller
**Base URL**: `/user`

### 1. Get All Users
- **Endpoint**: `GET /user/all`
- **Description**: Retrieves all users. Admin only.
- **Response**: Array of user details.

### 2. Get User by ID
- **Endpoint**: `GET /user/:id`
- **Description**: Retrieves details of a specific user. Admin only.
- **Request Parameters**: `id` (number, required): User ID.
- **Response**: User details.

### 3. Update User
- **Endpoint**: `PATCH /user/:id`
- **Description**: Updates a specific user's details. Admin only.
- **Request Parameters**: `id` (number, required): User ID.
- **Request Body**: `UpdateUserDto`
- **Response**: Updated user details.

### 4. Delete User
- **Endpoint**: `DELETE /user/:id`
- **Description**: Deletes a specific user. Admin only.
- **Request Parameters**: `id` (number, required): User ID.
- **Response**: Confirmation of user deletion.

### 5. Get User's Own Profile
- **Endpoint**: `GET /user`
- **Description**: Retrieves the profile information of the logged-in user.
- **Response**: User details of the logged-in user.

### 6. Update User's Own Profile
- **Endpoint**: `PATCH /user`
- **Description**: Updates the profile of the logged-in user.
- **Request Body**: `UpdateUserDto`
- **Response**: Updated details of the logged-in user.

### 7. Delete User's Own Profile
- **Endpoint**: `DELETE /user`
- **Description**: Deletes the profile of the logged-in user.
- **Response**: Confirmation of deletion of the logged-in user's profile.

### 8. Promote User
- **Endpoint**: `POST /user/:id/promote`
- **Description**: Promotes the user to a higher role. Admin only.
- **Request Parameters**: `id` (number, required): User ID.
- **Response**: Confirmation of user promotion.

### 9. Demote User
- **Endpoint**: `POST /user/:id/demote`
- **Description**: Demotes the user to a lower role. Admin only.
- **Request Parameters**: `id` (number, required): User ID.
- **Response**: Confirmation of user demotion.

### 10. Get User's Bookings
- **Endpoint**: `GET /user/booking`
- **Description**: Retrieves all bookings associated with the logged-in user.
- **Response**: Array of bookings for the logged-in user.

### 11. Get Bookings by User ID
- **Endpoint**: `GET /user/:id/booking`
- **Description**: Retrieves all bookings associated with a specific user. Admin only.
- **Request Parameters**: `id` (number, required): User ID.
- **Response**: Array of bookings for the specified user.
