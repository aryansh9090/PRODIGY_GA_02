<<<<<<< HEAD
# Stable Diffusion Image Generator

This is a simple Python script that uses the Hugging Face `diffusers` library to generate images from text prompts using Stable Diffusion.

## Prerequisites

Before running the script, make sure you have Python installed. You will need to install the required libraries. 

Run the following command to install the dependencies:

```bash
pip install torch torchvision torchaudio
pip install diffusers transformers accelerate
```

*Note: Generating images using Stable Diffusion is computationally intensive. For reasonable performance, running on a machine with a CUDA-compatible NVIDIA GPU is highly recommended. The script will automatically fall back to CPU if a GPU is not available, but generation may take several minutes.*

## Usage

You can run the script from the command line by providing a text prompt using the `--prompt` argument.

```bash
python generate_image.py --prompt "A futuristic city skyline at sunset, cyberpunk style"
```

### Command Line Arguments

- `--prompt` (Required): The text description of the image you want to generate. Wrap the text in quotes if it contains spaces.
- `--output` (Optional): The file path where the generated image will be saved. Defaults to `output.png`.
- `--model` (Optional): The Hugging Face model ID to use. Defaults to `runwayml/stable-diffusion-v1-5`.

### Examples

Generate a simple image:
```bash
python generate_image.py --prompt "A cute cat playing with a ball of yarn"
```

Save the image to a specific file:
```bash
python generate_image.py --prompt "An astronaut riding a horse on Mars" --output "astronaut.png"
```

## Google Colab Alternative

Due to local hardware limitations (e.g., 8GB RAM, no dedicated GPU memory for AI), the image generation for this project was tested and validated using Google Colab's free GPU runtime.

If you are facing similar hardware constraints, you can easily run this generation in a Google Colab notebook. Create a new notebook, ensure you select a GPU runtime (Runtime -> Change runtime type -> Hardware accelerator -> T4 GPU), and run the following code block:

```python
!pip install diffusers transformers accelerate torch torchvision torchaudio

from diffusers import StableDiffusionPipeline
import torch

# Load the model
model_id = "runwayml/stable-diffusion-v1-5"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to("cuda")

# Generate the image
prompt = "A futuristic city skyline at sunset, cyberpunk style"
image = pipe(prompt).images[0]  
    
# Save the image
image.save("output.png")

# To display the image in the notebook:
display(image)
```

## Sample Outputs

Here are some sample images generated using the script and prompts:

![Sample 1](static/images/samples/sample_output_1.png)

![Sample 2](static/images/samples/sample_output_2.png)

![Sample 3](static/images/samples/sample_output_3.png)
=======
# PRODIGY_GA_02
>>>>>>> 1c3680485874da68d2bf8c3f43c04918467ad003
