import express from 'express';
import Replicate from 'replicate';
import multer from 'multer';

const router = express.Router();
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Configure Multer for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/text-to-video', async (req, res) => {
  try {
    // Get parameters from the request body
    const { prompt, fps, num_frames, num_inference_steps } = req.body;

    // Check if the prompt is provided
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required in the request body.' });
    }

    // Run the text-to-video replication with the user-provided parameters
    const output = await replicate.run(
      'cjwbw/damo-text-to-video:1e205ea73084bd17a0a3b43396e49ba0d6bc2e754e9283b2df49fad2dcf95755',
      {
        input: {
          fps: fps || 8, // Use user-provided fps or default to 8 if not provided
          prompt: prompt,
          num_frames: num_frames || 50, // Use user-provided num_frames or default to 50 if not provided
          num_inference_steps: num_inference_steps || 50, // Use user-provided num_inference_steps or default to 50 if not provided
        },
      }
    );

    console.log(output);
    res.json({ output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/image-to-video', async (req, res) => {
  try {
    // Get parameters from the request body
    const {
      cond_aug,
      decoding_t,
      input_image,
      video_length,
      sizing_strategy,
      motion_bucket_id,
      frames_per_second,
    } = req.body;

    // Check if the required parameters are provided
    if (!cond_aug || !decoding_t || !input_image || !video_length || !sizing_strategy || !motion_bucket_id || !frames_per_second) {
      return res.status(400).json({ error: 'All parameters are required in the request body.' });
    }

    // Run the image-to-video replication with the user-provided parameters
    const output = await replicate.run(
      'stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438',
      {
        input: { 
          cond_aug: parseFloat(cond_aug),
          decoding_t: parseInt(decoding_t),
          input_image,
          video_length,
          sizing_strategy,
          motion_bucket_id: parseInt(motion_bucket_id),
          frames_per_second: parseInt(frames_per_second),
        },
      }
    );

    console.log(output);
    res.json({ output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/cartoonify-video', upload.single('videoFile'), async (req, res) => {
  try {
    // Get parameters from the request body
    const { frame_rate, horizontal_resolution } = req.body;

    // Check if the required parameters are provided
    if (!req.file || !frame_rate || !horizontal_resolution) {
      return res.status(400).json({ error: 'All parameters are required in the request body.' });
    }

    // Convert the video buffer to base64 string
    const base64Video = req.file.buffer.toString('base64');

    // Construct the URI for the base64 video
    const infile = `data:video/mp4;base64,${base64Video}`;

    // Run the cartoonify-video replication with the user-provided parameters
    const output = await replicate.run(
      'sanzgiri/cartoonify_video:11095c67166f44781a9274969e75bae32ef7896bc17cb5d95732aa63e7d1b86e',
      {
        input: {
          infile,
          frame_rate: parseInt(frame_rate),
          horizontal_resolution: parseInt(horizontal_resolution),
        },
      }
    );

    console.log(output);
    res.json({ output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/changingbg', upload.single('input_video'), async (req, res) => {
  try {
    // Check if the input_video file is provided
    if (!req.file) {
      return res.status(400).json({ error: 'Input video file is required.' });
    }

    // Check if the output_type is provided
    const outputType = req.body.output_type;
    if (!outputType) {
      return res.status(400).json({ error: 'Output type is required.' });
    }

    // Convert the video buffer to base64 string
    const base64Video = req.file.buffer.toString('base64');

    // Construct the URI for the base64 video
    const infile = `data:video/mp4;base64,${base64Video}`;

    // Run the changing background replication with the user-provided parameters
    const output = await replicate.run(
      'arielreplicate/robust_video_matting:73d2128a371922d5d1abf0712a1d974be0e4e2358cc1218e4e34714767232bac',
      {
        input: {
          input_video: infile,
          output_type: outputType,
        },
      }
    );

    console.log(output);
    res.json({ output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/video-crafter', async (req, res) => {
  try {
    // Check if prompt is provided in the request body
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    // Parse integer values or use default values if not provided or not valid
    const fps = parseInt(req.body.fps) || 15;
    const seed = parseInt(req.body.seed) || 64045;
    const steps = parseInt(req.body.steps) || 40;
    const width = parseInt(req.body.width) || 1024;
    const height = parseInt(req.body.height) || 576;

    // Run the video crafter with the user-provided or default parameters
    const output = await replicate.run(
      'lucataco/video-crafter:7757c5775e962c618053e7df4343052a21075676d6234e8ede5fa67c9e43bce0',
      {
        input: {
          fps,
          seed,
          steps,
          width,
          height,
          prompt,
        },
      }
    );

    console.log(output);
    res.json({ output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/infinite-zoom', async (req, res) => {
  try {
    // Get parameters from the request body
    const { prompt, inpaint_iter, output_format } = req.body;

    // Check if prompt is provided
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required in the request body.' });
    }

    // Use user-provided inpaint_iter or default to 2 if not provided
    const inpaintIter = parseInt(inpaint_iter) || 2;

    // Use user-provided output_format or default to "mp4" if not provided
    const outputFormat = output_format || 'mp4';

    // Run the infinite-zoom replication with the user-provided or default parameters
    const output = await replicate.run(
      'arielreplicate/stable_diffusion_infinite_zoom:a2527c5074fc0cf9fa6015a40d75d080d1ddf7082fabe142f1ccd882c18fce61',
      {
        input: {
          prompt,
          inpaint_iter: inpaintIter,
          output_format: outputFormat,
        },
      }
    );

    console.log(output);
    res.json({ output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/lantana-video', async (req, res) => {
  try {
    // Check if prompt is provided in the request body
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    // Parse integer values or use default values if not provided or not valid
    const fps = parseInt(req.body.fps) || 4;
    const model_name = req.body.model_name || "dreamlike-art/dreamlike-photoreal-2.0";
    const timestep_t0 = parseInt(req.body.timestep_t0) || 44;
    const timestep_t1 = parseInt(req.body.timestep_t1) || 47;
    const video_length = parseInt(req.body.video_length) || 8;
    const negative_prompt = req.body.negative_prompt || "";
    const motion_field_strength_x = parseInt(req.body.motion_field_strength_x) || 12;
    const motion_field_strength_y = parseInt(req.body.motion_field_strength_y) || 12;

    // Run the video crafter with the user-provided or default parameters
    const output = await replicate.run(
      'cjwbw/text2video-zero:e671ffe4e976c0ec813f15a9836ebcfd08857ac2669af6917e3c2549307f9fae',
      {
        input: {
          fps,
          prompt,
          model_name,
          timestep_t0,
          timestep_t1,
          video_length,
          negative_prompt,
          motion_field_strength_x,
          motion_field_strength_y
        },
      }
    );

    console.log(output);
    res.json({ output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





export default router;
