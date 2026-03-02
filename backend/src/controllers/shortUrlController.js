import Url from "../models/shortUrlModel.js";
import argon2 from "argon2";

export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, shortCode, isProtected, password } = req.body || {};

    if (!originalUrl || !shortCode) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    try {
      new URL(originalUrl);
    } catch (error) {
      return res.status(400).json({ message: "Invalid Url" });
    }

    if (isProtected === true && !password) {
      return res.status(400).json({
        message: "password is required for protected Url",
      });
    }

    if (isProtected === false && password) {
      return res.status(400).json({
        message: "Password is not required for unprotected Url",
      });
    }

    if (shortCode.includes(" ")) {
      return res.status(400).json({
        message: "ShortCode should not contains space",
      });
    }

    const exist = await Url.exists({ shortCode });
    if (exist) {
      return res.status(409).json({
        message: "ShortCode already Exist",
      });
    }

    const shortUrl = `${process.env.BASE_URL}/r/${shortCode}`;
    let hashedPassword = null;

    if (isProtected === true) {
      if (password.trim().length < 8) {
        return res.status(400).json({
          message: "password should be atleast 8 character",
        });
      }

      hashedPassword = await argon2.hash(password.trim());
    }

    const newUrl = new Url({
      originalUrl,
      shortCode,
      shortUrl,
      isProtected,
      password: hashedPassword,
    });

    const savedUrl = await newUrl.save();
    return res.status(201).json({
      message: "created successfully",
      savedUrl,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getAllShortUrls = async (_, res) => {
  try {
    const data = await Url.find().select("-password");

    console.log(data);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getShortUrlById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Url.findById(id).select("-password");

    if(!data) return res.status(404).json("404 Error");

    console.log(data);
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateShortUrlById = async (req, res) => {
  try {
    const { id } = req.params;
    const { originalUrl, shortCode, password, newPassword, isProtected } =
      req.body || {};

    const url = await Url.findById(id).select("+password");

    if (!url) return res.status(404).json({ message: "shortUrl Not Found" });

    if (!shortCode)
      return res.status(400).json({ message: "shortCode is required" });

    if (shortCode !== url.shortCode) {
      const exists = await Url.exists({ shortCode });
      if (exists) {
        return res.status(409).json({
          message: "ShortCode already exists",
        });
      }
      if (shortCode.includes(" ")) {
        return res.status(400).json({
          message: "ShortCode should not contains space",
        });
      }
      url.shortCode = shortCode;
      url.shortUrl = `${process.env.BASE_URL}/r/${shortCode}`;
    }

    if (originalUrl) {
      try {
        new URL(originalUrl);
        url.originalUrl = originalUrl;
      } catch (error) {
        return res.status(400).json({
          message: "Invalid Url",
        });
      }
    }

    if (url.isProtected === true) {
      if (!password) {
        return res.status(401).json({
          message: "Password is required to update protected URL",
        });
      }

      const isMatch = await argon2.verify(url.password, password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }

      if (!isProtected) {
        url.isProtected = isProtected;
        url.password = null;
      }

      if (isProtected) {
        if (newPassword && newPassword.trim().length < 8) {
          return res.status(400).json({
            message: "New password should be atleast 8 character",
          });
        }

        if (newPassword) {
          const hashedPassword = await argon2.hash(newPassword.trim());
          url.password = hashedPassword;
        }
      }
    }

    if (!url.isProtected && isProtected) {
      if (!password) {
        return res.status(401).json({
          message: "Password is required for protected URL",
        });
      }

      if (password.trim().length < 8) {
        return res.status(400).json({
          message: "New password should be atleast 8 character",
        });
      }

      url.isProtected = true;
      const hashedPassword = await argon2.hash(password.trim());
      url.password = hashedPassword;
    }

    const updatedUrl = await url.save();

    return res.status(200).json({ success: true, updatedUrl });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteShortUrlById = async (req, res) => {
  try {
    const { id } = req.params;

    const url = await Url.findByIdAndDelete(id);

    if (!url) return res.status(404).json({ message: "Url not Found" });

    return res
      .status(200)
      .json({ message: "Url Deleted Successfully! ", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: true });
  }
};
