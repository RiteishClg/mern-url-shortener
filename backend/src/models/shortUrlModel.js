import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          try {
            new URL(value);
            return true;
          } catch (err) {
            return false;
          }
        },
        message: "Invalid URL",
      },
    },

    shortCode: {
      type: String,
      required: true,
      unique: true,
    },

    shortUrl: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          try {
            new URL(value);
            return true;
          } catch (err) {
            return false;
          }
        },
        message: "Invalid URL",
      },
    },

    isProtected: {
      type: Boolean,
      default: false,
    },

    password: {
      type: String,
      default: null,
      select: false,
      validate: {
        validator: function (value) {
          if (this.isProtected) {
            return value !== null && value !== "";
          }
          return value === null;
        },
        message:
          "Password must exist when isProtected is true, and must be null when isProtected is false",
      },
    },

    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Url", urlSchema);
