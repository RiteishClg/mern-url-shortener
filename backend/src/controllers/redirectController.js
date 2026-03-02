import Url from "../models/shortUrlModel.js";
import argon2 from "argon2";

export const handleShortUrlRedirect = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ message: "ShortUrl not Found" });

    if (url.isProtected === false) {
      url.clicks += 1;
      await url.save();
      return res.redirect(url.originalUrl)
    }

    if(url.isProtected === true){
      return res.redirect(`http://localhost:5173/protected/${url.shortCode}`)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const verifyPasswordAndRedirect = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const { password } = req.body;

    const url = await Url.findOne({ shortCode }).select("+password");

    if (!url)
      return res.status(404).json({
        message: "ShortUrl Not Found",
      });

    if (!password)
      return res.status(400).json({
        message: "Password is required!",
      });

    const isMatch = await argon2.verify(url.password, password);
    if (!isMatch)
      return res.status(401).json({
        message: "Invalid Password!",
      });

    url.clicks += 1;
    url.save();

    return res.status(200).json({
      success:true,
      originalUrl: url.originalUrl,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};