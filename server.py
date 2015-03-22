from flask import Flask, render_template
import get_amee_api as amee
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/api/companies/sustainability/')
def json_sustainability():
    api_call = amee.get_amee_data()
    json_data = amee.filter_sustainability(api_call)
    print json_data
    return json_data


if __name__ == '__main__':
    app.run(debug=True)

