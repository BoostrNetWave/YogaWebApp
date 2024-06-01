import express from "express";
import { getUserDetails, login, logout, signin } from "../Controllers/UserControllers/signing_login.mjs";
import { updateDetails, updateFeedback, updatePassword } from "../Controllers/UserControllers/updateUserInfo.mjs";
import { addComment, addPremium, buyVideo, disLikeVideo, likeVideo, payment, trackHasVideoWatched, trackTotalVideoWatched } from "../Controllers/UserControllers/trackUserActivity.mjs";
import { upload } from "../utils/uploadImage.mjs";

const router = express.Router();

router.get("/", getUserDetails); // middleware will be implemented
router.post("/signin", signin);
router.post("/login", login);
router.put("/logout", logout)

router.put("/updateDetails/:mail", updateDetails);
router.put("/updatePassword/:mail", updatePassword);
router.put("/updateFeedback/:mail", updateFeedback);

router.route("/trackVideoWatching/:mail")
    .post(trackHasVideoWatched)
    .put(trackTotalVideoWatched)

router.post("/buyVideo", buyVideo);
router.post("/addPremium", addPremium);
router.put("/like/:contentId", likeVideo)
router.put("/dislike/:contentId", disLikeVideo)
router.post("/addComment", addComment)

router.post("/payment/:mailId", upload.single("file"), payment)

export { router }