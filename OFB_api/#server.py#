from flask import Flask, render_template
import get_amee_api as amee
app = Flask(__name__)

@app.route('/api/get_amee_data/')
# Use get_amee_api to retrieve data
# and feed it into the db
def feed_amee_data():
    api_call = amee.get_amee_data()
    json_data = amee.get_sustainability_data(api_call)
    print json_data
    return json_data

@app.route('/api/serve_amee_data/')
# Get data from the db and serve it
def serve_amee_data():
    pass


if __name__ == '__main__':
    app.run(debug=True)

