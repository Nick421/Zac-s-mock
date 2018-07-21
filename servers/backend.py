from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
# Signing Access-Control-Allow-Origin. This is CRITICAL.
CORS(app)

# Data Stores
histories = []

# Conversion from data to JSON object.
def histories_to_JSON():
	json = []

	# Adding messages from history to Json Object.
	for message in histories:
		json.append({ "message" : message })

	return json

# API
@app.route('/get_history')
def get_history():
    return jsonify(histories_to_JSON())

@app.route('/add_message', methods=['POST'])
def add_message():

	# Retrieve the new message.
	new_message = request.args.get('message')

	if new_message == None:
		return jsonify({ "status" : "null Received" })

	# Adding the message to history.
	histories.append(new_message)

	# Return status. This is arbitary.
	return jsonify({ "status" : "success" })
