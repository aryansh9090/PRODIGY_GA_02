document.addEventListener('DOMContentLoaded', () => {
    const promptInput = document.getElementById('prompt-input');
    const generateBtn = document.getElementById('generate-btn');
    const btnText = document.querySelector('.btn-text');
    const loader = document.querySelector('.loader');
    const errorMessage = document.getElementById('error-message');
    const imageContainer = document.getElementById('image-container');
    const placeholder = document.querySelector('.placeholder');
    const generatedImage = document.getElementById('generated-image');
    const actionButtons = document.getElementById('action-buttons');
    const downloadBtn = document.getElementById('download-btn');

    // 3D Tilt Effect
    imageContainer.addEventListener('mousemove', (e) => {
        const rect = imageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
        const rotateY = ((x - centerX) / centerX) * 10;
        
        imageContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    imageContainer.addEventListener('mouseleave', () => {
        imageContainer.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        // Add transition back to normal
        imageContainer.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
            imageContainer.style.transition = 'transform 0.1s ease'; // reset for smooth mousemove
        }, 500);
    });

    generateBtn.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        
        if (!prompt) {
            showError("Please enter a prompt.");
            return;
        }

        // Set loading state
        setLoading(true);
        hideError();
        
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: prompt })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate image.");
            }

            // Success
            displayImage(data.image_url);

        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(false);
        }
    });

    function setLoading(isLoading) {
        if (isLoading) {
            generateBtn.disabled = true;
            btnText.classList.add('hidden');
            loader.classList.remove('hidden');
            promptInput.disabled = true;
        } else {
            generateBtn.disabled = false;
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
            promptInput.disabled = false;
        }
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    function hideError() {
        errorMessage.classList.add('hidden');
    }

    function displayImage(url) {
        // Add timestamp to prevent caching
        generatedImage.src = url + "?t=" + new Date().getTime();
        downloadBtn.href = url + "?t=" + new Date().getTime();
        
        generatedImage.onload = () => {
            placeholder.classList.add('hidden');
            generatedImage.classList.remove('hidden');
            actionButtons.classList.remove('hidden');
            
            // Add a subtle entrance animation
            generatedImage.animate([
                { opacity: 0, transform: 'scale(0.95) translateZ(20px)' },
                { opacity: 1, transform: 'scale(1) translateZ(20px)' }
            ], {
                duration: 500,
                easing: 'ease-out'
            });
        };
    }
});
