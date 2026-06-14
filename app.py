from flask import Flask, request, jsonify, render_template, url_for
from generate_image import generate_image
import os
import uuid

app = Flask(__name__)

# Ensure static/images directory exists
os.makedirs(os.path.join('static', 'images'), exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/generate', methods=['POST'])
def generate():
    data = request.json
    prompt = data.get('prompt')
    
    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400
        
    # Generate unique filename
    filename = f"image_{uuid.uuid4().hex[:8]}.png"
    filepath = os.path.join('static', 'images', filename)
    
    try:
        # Calls the function from generate_image.py
        success, message = generate_image(prompt, filepath)
        if success:
            image_url = url_for('static', filename=f'images/{filename}')
            return jsonify({'success': True, 'image_url': image_url})
        else:
            return jsonify({'error': message}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
