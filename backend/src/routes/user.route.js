import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import {
    getMyFriends,
    getRecommendedUsers,
    sendFriendRequest,
    acceptFriendRequest,
    getFriendRequest,
    getOutgoingFriendReqs
} from "../controllers/user.controller";

const router = express.route();

router.use(protectr);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.post("/friend-request", getFriendRequest);

router.get("/outgoing-friend-requests",getOutgoingFriendReqs)

export default router;