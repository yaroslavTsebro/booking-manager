db.createUser({
  user: "adminUser",
  pwd: "securePassword",
  roles: [
    {
      role: "readWrite",
      db: "booking",
    },
  ],
});

db.createCollection("bookings");