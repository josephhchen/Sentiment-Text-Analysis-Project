from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

sentiment_analyzer = pipeline("sentiment-analysis")

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.json
    text = data.get('text')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    result = sentiment_analyzer(text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='172.16.21.86', port=5000, debug=True)
