# npx kill-port 5000
# python -m flask run -p 5000
from flask import Flask
app = Flask(__name__)
import mysql.connector
import os
# pip install python-dotenv
from dotenv import load_dotenv
load_dotenv()

mydb = mysql.connector.connect(
    host= os.getenv('DB_HOST'), 
    user= os.getenv('DB_USER'), 
    password= os.getenv('DB_PASSWORD'), 
    database= os.getenv('DB_DATABASE')
)
if mydb.is_connected():
    print('connected to database')

@app.route('/')
def hello():
    return 'flask running on server'

@app.route('/greet/<name>')
def greet(name):
    return f'Hello, {name}!'

@app.route('/battery')
def battery():
    cursor = mydb.cursor()
    cursor.execute('SELECT * FROM battery')
    result = cursor.fetchall()
    items = [f"{row[0]} {row[1]} {row[2]}" for row in result]
    mydb.close()
    return "<br>".join(items)

if __name__ == '__main__':
    app.run(port=5000)
