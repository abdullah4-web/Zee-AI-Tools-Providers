import express from "express";
import {
  paragraphController,
  chatbotController,
  jsconverterController,
  ImageController,
  visionController,
  youtubetitlesController,
  codegeneratorController,
  articleController,
  keywordController,
} from "../controllers/AiController.js";

const router = express.Router();

//route

router.post("/paragraph",  paragraphController);
router.post('/chatbot',chatbotController);
router.post("/js-converter",  jsconverterController);
router.post("/imagegenerator",  ImageController);
router.post("/process-image",  visionController);
router.post("/youtubetitles",  youtubetitlesController);
router.post("/codegenerator",   codegeneratorController);
router.post("/articlegenerator",   articleController);
router.get("/keyword",  keywordController);





export default router;
